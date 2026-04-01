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
  Clock, LogOut, Pencil
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [company, setCompany] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);

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
        setAvatarUrl(data.avatar_url || "");
      }
      setLoading(false);
    };
    fetchProfile();
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

    // Auto-save avatar URL
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
        avatar_url: avatarUrl.split("?")[0],
      })
      .eq("user_id", user.id);

    setSaving(false);
    if (error) {
      toast.error("บันทึกไม่สำเร็จ: " + error.message);
    } else {
      toast.success("บันทึกโปรไฟล์สำเร็จ!");
      setEditing(false);
    }
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
      {/* Profile Header / Cover */}
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
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
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
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" /> {user?.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> สมาชิกตั้งแต่ {memberSince}
                </span>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-1.5" /> ออกจากระบบ
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="container mx-auto px-4 pb-12">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="w-full md:w-auto bg-muted/50 p-1 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> แก้ไขโปรไฟล์
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
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <DashboardCard
                icon={<Activity className="h-5 w-5 text-primary" />}
                label="สถานะบัญชี"
                value="Active"
                sub="บัญชีของคุณพร้อมใช้งาน"
                delay={0}
              />
              <DashboardCard
                icon={<Clock className="h-5 w-5 text-amber-500" />}
                label="เข้าสู่ระบบล่าสุด"
                value={
                  user?.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString("th-TH", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"
                }
                sub="วันที่เข้าใช้งานล่าสุด"
                delay={0.05}
              />
              <DashboardCard
                icon={<Shield className="h-5 w-5 text-emerald-500" />}
                label="ยืนยันอีเมล"
                value={user?.email_confirmed_at ? "ยืนยันแล้ว ✓" : "ยังไม่ยืนยัน"}
                sub={user?.email || ""}
                delay={0.1}
              />
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
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
                  อัปเดต <strong className="text-foreground">โปรไฟล์</strong> ของคุณให้ครบถ้วนเพื่อประสบการณ์ที่ดีขึ้น
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  ดูหน้า <strong className="text-foreground">How It Works</strong> เพื่อทำความเข้าใจขั้นตอนการวิเคราะห์
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

                {/* Email (always read-only) */}
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

                {editing && (
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleSave} disabled={saving} className="flex-1">
                      {saving ? (
                        <><Loader2 className="h-4 w-4 animate-spin mr-2" /> กำลังบันทึก...</>
                      ) : (
                        <><Save className="h-4 w-4 mr-2" /> บันทึก</>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setEditing(false)}>
                      ยกเลิก
                    </Button>
                  </div>
                )}
              </div>
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
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">อีเมลยืนยัน</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      user?.email_confirmed_at
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}>
                      {user?.email_confirmed_at ? "ยืนยันแล้ว" : "รอยืนยัน"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">วิธีเข้าสู่ระบบ</p>
                        <p className="text-xs text-muted-foreground">
                          {user?.app_metadata?.provider === "google" ? "Google Sign-in" : "Email & Password"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">เข้าสู่ระบบล่าสุด</p>
                        <p className="text-xs text-muted-foreground">
                          {user?.last_sign_in_at
                            ? new Date(user.last_sign_in_at).toLocaleString("th-TH")
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
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

function DashboardCard({
  icon,
  label,
  value,
  sub,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </motion.div>
  );
}
