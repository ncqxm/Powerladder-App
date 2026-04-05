import { useNavigate } from "react-router-dom";
import { Mail, Globe, Phone } from "lucide-react";
export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-black text-lg text-foreground mb-3">
              <span className="text-xl">🦄</span> Business Play
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The fusion of Data Science & Strategic Consulting to power your next move.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate("/canvas")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Business Play Models
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/context")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Strategy Generator
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/pipeline")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  RAG Pipeline
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.powerladder.net/plstart" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  PowerLadder Assessment
                </a>
              </li>
              <li>
                <a href="https://www.powerladder.net/make-right-choice/dithanon-khrutmuang" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Business Adviser
                </a>
              </li>
              <li>
                <a href="https://www.powerladder.net/make-right-choice/khin-thandar-kyaw" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Data Scientist
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">ติดต่อ Power Ladder</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:dithanon@powerladder.tech" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-3.5 w-3.5" /> dithanon@powerladder.tech
                </a>
              </li>
              <li>
                <a href="https://powerladder.net" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Globe className="h-3.5 w-3.5" /> powerladder.net
                </a>
              </li>
              <li>
                <a href="https://powerladder.net" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-3.5 w-3.5" /> ติดต่อเรา
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Business Play by PowerLadder. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Data Science & Strategic Consulting
          </p>
        </div>
      </div>
    </footer>
  );
}
