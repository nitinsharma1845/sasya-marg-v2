import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Lock, Eye, EyeOff, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { 
  useSendOtp, 
  useFarmerLoginWithOtp, 
  useFarmerLoginWithPassword 
} from "@/hooks/auth.hooks";

const LoginForm = () => {
  const [mode, setMode] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [sentOtp, setSentOtp] = useState(false);
  const [timer, setTimer] = useState(0);

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const { mutate: sendOtp, isPending: sendingOtp } = useSendOtp();
  const { mutate: loginWithOtp, isPending: otpPending } = useFarmerLoginWithOtp();
  const { mutate: loginWithPassword, isPending: passwordPending } = useFarmerLoginWithPassword();

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

  function handleLoginFarmer(data) {
    if (mode === "otp") {
      loginWithOtp({ phone: data.phone, otp: data.otp });
    } else {
      loginWithPassword({ phone: data.phone, password: data.password });
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
      </div>

      <div className="grid grid-cols-2 p-1 bg-muted rounded-xl">
        {["password", "otp"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === m ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "password" ? "Password" : "OTP Login"}
          </button>
        ))}
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(handleLoginFarmer)}>
        <div className="space-y-2">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="Phone Number"
              className="pl-10 h-11"
              {...register("phone", {
                required: "Phone is required",
                pattern: { value: /^[0-9]{10}$/, message: "Valid 10-digit number required" },
              })}
            />
          </div>
          {errors.phone && <p className="text-[11px] text-destructive ml-1">{errors.phone.message}</p>}
        </div>

        {mode === "password" ? (
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-10 pr-10 h-11"
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
              <Link to="/farmer/forgot-password" size="sm" className="text-xs font-semibold text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                disabled={!sentOtp}
                placeholder="6-digit OTP"
                className="pl-10 h-11 tracking-[0.2em] font-mono"
                {...register("otp", {
                  required: "OTP is required",
                  minLength: { value: 6, message: "Enter full code" },
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
            {errors.otp && <p className="text-[11px] text-destructive ml-1">{errors.otp.message}</p>}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 text-sm font-bold shadow-lg shadow-primary/20"
          disabled={isSubmitting || otpPending || passwordPending}
        >
          {isSubmitting || otpPending || passwordPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span className="flex items-center">Log In <ArrowRight className="ml-2 h-4 w-4" /></span>
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          New to Sayamarg?{" "}
          <Link to="/farmer/signup" className="font-bold text-primary hover:underline underline-offset-4">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;