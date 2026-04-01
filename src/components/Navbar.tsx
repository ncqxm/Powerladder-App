import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Business Play", path: "/canvas" },
  { label: "How It Works", path: "/pipeline" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<{ display_name: string | null; avatar_url: string | null } | null>(null);

  useEffect(() => {
    if (!user) { setProfile(null); return; }
    supabase.from("profiles").select("display_name, avatar_url").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [user]);

  const displayName = profile?.display_name || user?.user_metadata?.full_name || null;
  const initials = displayName ? displayName.slice(0, 1).toUpperCase() : user?.email?.slice(0, 1).toUpperCase() || "?";

  const handleSignOut = async () => {
    await signOut();
    toast.success("ออกจากระบบแล้ว");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-black text-xl text-foreground hover:text-primary transition-colors"
        >
          <span className="text-2xl">🦄</span>
          <span>Business Play</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-secondary transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">{initials}</AvatarFallback>
                    </Avatar>
                    {displayName && <span className="text-sm font-medium text-foreground max-w-[100px] truncate hidden lg:block">{displayName}</span>}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="h-4 w-4 mr-2" /> โปรไฟล์
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Settings className="h-4 w-4 mr-2" /> ตั้งค่า
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" /> ออกจากระบบ
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                เข้าสู่ระบบ
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                size="sm"
              >
                สมัครสมาชิก
              </Button>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
              className={cn(
                "block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-2 mt-2">
            <ThemeToggle />
            {user ? (
              <Button variant="outline" size="sm" className="flex-1" onClick={() => { handleSignOut(); setMobileOpen(false); }}>
                <LogOut className="h-4 w-4 mr-1" /> ออกจากระบบ
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => { navigate("/login"); setMobileOpen(false); }}>
                  เข้าสู่ระบบ
                </Button>
                <Button
                  onClick={() => { navigate("/register"); setMobileOpen(false); }}
                  className="flex-1 bg-primary text-primary-foreground"
                  size="sm"
                >
                  สมัครสมาชิก
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
