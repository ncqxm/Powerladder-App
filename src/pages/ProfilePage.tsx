import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  User, Building2, Camera, Save, Loader2,
  Mail, Shield, Calendar, BarChart3, Activity,
  Clock, LogOut, Pencil, FileText, Download,
  Trash2, Factory, TrendingUp, ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Analysis {
  id: string;
  title: string;
  industry: string | null;
  opportunity_score: number | null;
  financial_score: number | null;
  sweet_spot_score: number | null;
  business_play: string | null;
  created_at: string;
  market_size: number | null;
  customer_base: number | null;
  revenue: number | null;
  cash_on_hand: number | null;
  accounts_receivable: number | null;
  current_liabilities: number | null;
  inventory_units: number | null;
  unit_cost: number | null;
  sales_velocity: number | null;
  growth_target: number | null;
  risk_tolerance: string | null;
}

const INDUSTRY_OPTIONS = [
  "Retail", "Wellness & Spa", "Food & Beverage", "E-Commerce",
  "Technology", "Healthcare", "Education", "Manufacturing", "Other"
];

const PLAY_EMOJI: Record<string, string> = {
  "Handle the Ski": "🛡️",
  "Calculated Ambition": "🧠",
  "Unicorn": "🦄",
  "Dinosaur": "🦕",
};

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loadingAnalyses, setLoadingAnalyses] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setDisplayName(data.display_name || "");
        setCompany(data.company || "");
        setIndustry((data as any).industry || "");
        setAvatarUrl(data.avatar_url || "");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchAnalyses = async () => {
      const { data } = await supabase
        .from("analyses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setAnalyses(data as Analysis[]);
      setLoadingAnalyses(false);
    };
    fetchAnalyses();
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("ขนาดไฟล์ต้องไม่เกิน 2MB");
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("อัปโหลดรูปไม่สำเร็จ");
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const newUrl = publicUrl + "?t=" + Date.now();
    setAvatarUrl(newUrl);

    await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("user_id", user.id);

    setUploading(false);
    toast.success("อัปโหลดรูปสำเร็จ");
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName.trim(),
        company: company.trim(),
        industry: industry.trim() || null,
        avatar_url: avatarUrl.split("?")[0],
      } as any)
      .eq("user_id", user.id);

    setSaving(false);
    if (error) {
      toast.error("บันทึกไม่สำเร็จ: " + error.message);
    } else {
      toast.success("บันทึกโปรไฟล์สำเร็จ!");
      setEditing(false);
    }
  };

  const handleDeleteAnalysis = async (id: string) => {
    const { error } = await supabase.from("analyses").delete().eq("id", id);
    if (error) {
      toast.error("ลบไม่สำเร็จ");
    } else {
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
      toast.success("ลบการวิเคราะห์แล้ว");
    }
  };

  const handleExportCSV = () => {
    if (analyses.length === 0) return;
    const headers = ["Title", "Industry", "Opportunity", "Financial", "Sweet Spot", "Business Play", "Date"];
    const rows = analyses.map((a) => [
      a.title,
      a.industry || "",
      a.opportunity_score?.toFixed(1) || "",
      a.financial_score?.toFixed(1) || "",
      a.sweet_spot_score?.toFixed(1) || "",
      a.business_play || "",
      new Date(a.created_at).toLocaleDateString("th-TH"),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `business-analyses-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("ส่งออก CSV สำเร็จ");
  };

  const handleExportSingleJSON = (analysis: Analysis) => {
    const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analysis-${analysis.id.slice(0, 8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("ออกจากระบบแล้ว");
    navigate("/");
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-40 md:h-52 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/30 dark:from-primary/40 dark:via-primary/20 dark:to-primary/10" />

        <div className="container mx-auto px-4">
          <div className="relative -mt-16 md:-mt-20 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 pb-6">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative group"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-card border-4 border-background shadow-lg flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-2 right-2 w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-all hover:scale-105"
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </motion.div>

            {/* Name & Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-1 text-center md:text-left"
            >
              <h1 className="text-2xl md:text-3xl font-black text-foreground">
                {displayName || "ยังไม่ได้ตั้งชื่อ"}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1.5 text-sm text-muted-foreground">
                {company && (
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" /> {company}
                  </span>
                )}
                {industry && (
                  <span className="flex items-center gap-1">
                    <Factory className="h-3.5 w-3.5" /> {industry}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" /> {user?.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> สมาชิกตั้งแต่ {memberSince}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-2"
            >
              <Button variant="outline" size="sm" onClick={handleSignOut} className="text-destructive hover:text-destructive">
                <LogOut className="h-4 w-4 mr-1.5" /> ออกจากระบบ
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 pb-12">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="w-full md:w-auto bg-muted/50 p-1 mb-6 flex-wrap">
            <TabsTrigger value="dashboard" className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> ข้อมูลส่วนตัว
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> ประวัติวิเคราะห์
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1.5">
              <Shield className="h-4 w-4" /> ความปลอดภัย
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <DashboardCard
                icon={<Activity className="h-5 w-5 text-primary" />}
                label="สถานะบัญชี"
                value="Active"
                sub="พร้อมใช้งาน"
                delay={0}
              />
              <DashboardCard
                icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
                label="การวิเคราะห์ทั้งหมด"
                value={String(analyses.length)}
                sub="รายการที่บันทึกไว้"
                delay={0.05}
              />
              <DashboardCard
                icon={<Clock className="h-5 w-5 text-amber-500" />}
                label="เข้าสู่ระบบล่าสุด"
                value={
                  user?.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString("th-TH", {
                        day: "numeric", month: "short", year: "numeric",
                      })
                    : "-"
                }
                sub="วันที่เข้าใช้งานล่าสุด"
                delay={0.1}
              />
              <DashboardCard
                icon={<Shield className="h-5 w-5 text-emerald-500" />}
                label="ยืนยันอีเมล"
                value={user?.email_confirmed_at ? "ยืนยันแล้ว ✓" : "รอยืนยัน"}
                sub={user?.email || ""}
                delay={0.15}
              />
            </motion.div>

            {/* Recent Analyses */}
            {analyses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">📊 วิเคราะห์ล่าสุด</h3>
                  <Button variant="ghost" size="sm" onClick={() => {
                    const tabEl = document.querySelector('[data-state][value="history"]') as HTMLElement;
                    tabEl?.click();
                  }}>
                    ดูทั้งหมด <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {analyses.slice(0, 3).map((a) => (
                    <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{PLAY_EMOJI[a.business_play || ""] || "📋"}</span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{a.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {a.business_play || "N/A"} · Sweet Spot: {a.sweet_spot_score?.toFixed(0) || "–"}/100
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(a.created_at).toLocaleDateString("th-TH")}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 rounded-xl border border-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground mb-3">💡 เคล็ดลับการใช้งาน</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  ลองใช้ <strong className="text-foreground">Business Play Canvas</strong> เพื่อวิเคราะห์กลยุทธ์ธุรกิจของคุณ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  อัปเดต <strong className="text-foreground">โปรไฟล์</strong> และอุตสาหกรรมของคุณให้ครบถ้วน
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  ส่งออก <strong className="text-foreground">ประวัติวิเคราะห์</strong> เป็น CSV เพื่อใช้ในรายงาน
                </li>
              </ul>
            </motion.div>
          </TabsContent>

          {/* Profile Edit Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl"
            >
              <div className="rounded-xl border border-border bg-card p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground">ข้อมูลส่วนตัว</h2>
                  {!editing && (
                    <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
                      <Pencil className="h-4 w-4 mr-1.5" /> แก้ไข
                    </Button>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">อีเมล</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input value={user?.email || ""} disabled className="pl-10 bg-muted/50" />
                  </div>
                </div>

                {/* Display Name */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">ชื่อแสดง</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="ชื่อของคุณ"
                      className="pl-10"
                      maxLength={100}
                      disabled={!editing}
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">บริษัท / องค์กร</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="ชื่อบริษัทของคุณ"
                      className="pl-10"
                      maxLength={100}
                      disabled={!editing}
                    />
                  </div>
                </div>

                {/* Industry */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">อุตสาหกรรม</Label>
                  <div className="relative">
                    <Factory className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      disabled={!editing}
                      className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm text-foreground disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">เลือกอุตสาหกรรม</option>
                      {INDUSTRY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {editing && (
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleSave} disabled={saving} className="flex-1">
                      {saving ? (
                        <><Loader2 className="h-4 w-4 animate-spin mr-2" /> กำลังบันทึก...</>
                      ) : (
                        <><Save className="h-4 w-4 mr-2" /> บันทึก</>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setEditing(false)}>ยกเลิก</Button>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* Analysis History Tab */}
          <TabsContent value="history">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Actions Bar */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">
                  ประวัติการวิเคราะห์ ({analyses.length})
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportCSV}
                    disabled={analyses.length === 0}
                  >
                    <Download className="h-4 w-4 mr-1.5" /> Export CSV
                  </Button>
                  <Button size="sm" onClick={() => navigate("/context")}>
                    <TrendingUp className="h-4 w-4 mr-1.5" /> วิเคราะห์ใหม่
                  </Button>
                </div>
              </div>

              {loadingAnalyses ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : analyses.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">ยังไม่มีประวัติการวิเคราะห์</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    เริ่มต้นวิเคราะห์ธุรกิจของคุณเพื่อดูผลลัพธ์ที่นี่
                  </p>
                  <Button onClick={() => navigate("/context")}>
                    <TrendingUp className="h-4 w-4 mr-1.5" /> เริ่มวิเคราะห์
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {analyses.map((a, i) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-xl shrink-0">
                            {PLAY_EMOJI[a.business_play || ""] || "📋"}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground truncate">{a.title}</p>
                            <p className="text-sm text-primary font-medium">{a.business_play || "N/A"}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                              {a.industry && <span>🏭 {a.industry}</span>}
                              <span>📊 Opportunity: {a.opportunity_score?.toFixed(0) || "–"}</span>
                              <span>💵 Financial: {a.financial_score?.toFixed(0) || "–"}</span>
                              <span>🎯 Sweet Spot: {a.sweet_spot_score?.toFixed(0) || "–"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-xs text-muted-foreground mr-2">
                            {new Date(a.created_at).toLocaleDateString("th-TH", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </span>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleExportSingleJSON(a)} title="Export JSON">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDeleteAnalysis(a.id)} title="ลบ">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl space-y-4"
            >
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">ความปลอดภัย</h2>
                <div className="space-y-4">
                  <SecurityRow
                    icon={<Mail className="h-4 w-4 text-primary" />}
                    title="อีเมลยืนยัน"
                    subtitle={user?.email || ""}
                    badge={user?.email_confirmed_at ? "ยืนยันแล้ว" : "รอยืนยัน"}
                    badgeOk={!!user?.email_confirmed_at}
                  />
                  <SecurityRow
                    icon={<Shield className="h-4 w-4 text-primary" />}
                    title="วิธีเข้าสู่ระบบ"
                    subtitle={user?.app_metadata?.provider === "google" ? "Google Sign-in" : "Email & Password"}
                  />
                  <SecurityRow
                    icon={<Clock className="h-4 w-4 text-primary" />}
                    title="เข้าสู่ระบบล่าสุด"
                    subtitle={user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString("th-TH") : "-"}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
                <h3 className="text-sm font-bold text-destructive mb-2">Danger Zone</h3>
                <p className="text-xs text-muted-foreground mb-3">การออกจากระบบจะยุติ session ปัจจุบัน</p>
                <Button variant="destructive" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-1.5" /> ออกจากระบบ
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function DashboardCard({ icon, label, value, sub, delay = 0 }: {
  icon: React.ReactNode; label: string; value: string; sub: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">{icon}</div>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </motion.div>
  );
}

function SecurityRow({ icon, title, subtitle, badge, badgeOk }: {
  icon: React.ReactNode; title: string; subtitle: string; badge?: string; badgeOk?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {badge && (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          badgeOk
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        }`}>
          {badge}
        </span>
      )}
    </div>
  );
}
