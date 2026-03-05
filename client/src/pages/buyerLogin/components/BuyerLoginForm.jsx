import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Lock, Eye, EyeOff, ArrowRight, Loader2, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSendOtp } from "@/hooks/auth.hooks";
import {
  useBuyerLoginWithOtp,
  useBuyerLoginWithPassword,
} from "@/hooks/buyer.hooks";

const BuyerLoginForm = () => {
  const [mode, setMode] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [sentOtp, setSentOtp] = useState(false);
  const [timer, setTimer] = useState(0);

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { mutate: sendOtp, isPending: sendingOtp } = useSendOtp();
  const { mutate: loginWithOtp, isPending: otpPending } = useBuyerLoginWithOtp();
  const { mutate: loginWithPassword, isPending: passwordPending } = useBuyerLoginWithPassword();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  async function handleSendOtp() {
    const isPhoneValid = await trigger("phone");
    if (isPhoneValid) {
      const phone = getValues("phone");
      sendOtp(
        { phone, purpose: "login" },
        {
          onSuccess: () => {
            setSentOtp(true);
            setTimer(120);
          },
        }
      );
    }
  }

  function handleLoginBuyer(data) {
    if (mode === "otp") {
      loginWithOtp({ phone: data.phone, otp: data.otp });
    } else {
      loginWithPassword({
        identifier: data.identifier,
        password: data.password,
      });
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-8 p-2">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Buyer Sign In</h1>
        <p className="text-sm text-muted-foreground">Access your wholesale dashboard and orders</p>
      </div>

      <div className="grid grid-cols-2 p-1 bg-muted rounded-xl">
        {["password", "otp"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setSentOtp(false);
              setTimer(0);
            }}
            className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${
              mode === m ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "password" ? "Password" : "OTP Login"}
          </button>
        ))}
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(handleLoginBuyer)}>
        {mode === "password" ? (
          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Email or Phone Number"
                className={`pl-10 h-11 ${errors.identifier ? "border-destructive" : ""}`}
                {...register("identifier", {
                  required: "Identifier is required",
                  validate: (value) =>
                    emailRegex.test(value) || phoneRegex.test(value) || "Enter valid email or 10-digit phone",
                })}
              />
            </div>
            {errors.identifier && <p className="text-[11px] text-destructive ml-1">{errors.identifier.message}</p>}
          </div>
        ) : (
          <div className="space-y-1">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Phone Number"
                className={`pl-10 pr-24 h-11 ${errors.phone ? "border-destructive" : ""}`}
                {...register("phone", {
                  required: "Phone is required",
                  pattern: { value: /^[0-9]{10}$/, message: "Valid 10-digit number required" },
                })}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {!sentOtp || timer === 0 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 text-primary font-bold hover:bg-primary/5"
                    onClick={handleSendOtp}
                    disabled={sendingOtp}
                  >
                    {sendingOtp ? <Loader2 className="h-3 w-3 animate-spin" /> : sentOtp ? "Resend" : "Get OTP"}
                  </Button>
                ) : (
                  <span className="text-xs font-mono text-muted-foreground pr-2">{formatTime(timer)}</span>
                )}
              </div>
            </div>
            {errors.phone && <p className="text-[11px] text-destructive ml-1">{errors.phone.message}</p>}
          </div>
        )}

        {mode === "password" ? (
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`pl-10 pr-10 h-11 ${errors.password ? "border-destructive" : ""}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Min 8 characters required" },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="flex justify-end">
              <Link to="/buyer/forgot-password" size="sm" className="text-xs font-semibold text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                disabled={!sentOtp}
                placeholder="6-digit OTP"
                className={`pl-10 h-11 tracking-[0.2em] font-mono ${errors.otp ? "border-destructive" : ""}`}
                {...register("otp", {
                  required: "OTP is required",
                  minLength: { value: 6, message: "Enter 6 digits" },
                })}
              />
            </div>
            {errors.otp && <p className="text-[11px] text-destructive ml-1">{errors.otp.message}</p>}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 font-bold shadow-lg shadow-primary/20 mt-2"
          disabled={otpPending || passwordPending}
        >
          {otpPending || passwordPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span className="flex items-center justify-center">Log In <ArrowRight className="ml-2 h-4 w-4" /></span>
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          New to Sayamarg?{" "}
          <Link to="/buyer/signup" className="font-bold text-primary hover:underline underline-offset-4">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BuyerLoginForm;