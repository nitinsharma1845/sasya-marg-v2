import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

const LogoutButton = ({
  onClick,
  size = "default",
  variant = "destructive",
  className = "",
}) => {
  const {t} = useTranslation()
  return (
    <Button
      variant={variant}
      onClick={onClick}
      size={size}
      className={className}
    >
      {t("navbar.logout")}
    </Button>
  );
};

export default LogoutButton;
