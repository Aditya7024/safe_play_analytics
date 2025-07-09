import { Shield } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-slate-900">
          SafePlay Analytics
        </h1>
      </div>
      <p className="text-slate-600 text-lg">
        Advanced Player Addiction Risk Assessment & Monitoring
      </p>
    </div>
  );
};

export default Header;
