import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, Phone, Hash, User } from "lucide-react";
import AppLoader from "@/components/common/AppLoader";
import { useGetReports } from "@/hooks/productReport.hooks";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusVariant = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-accent text-accent-foreground hover:bg-accent/80";
    case "resolved":
      return "bg-primary text-primary-foreground hover:bg-primary/80";
    case "rejected":
      return "bg-destructive text-destructive-foreground hover:bg-destructive/80";
    default:
      return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
  }
};

const ReportCard = ({ report }) => {
  return (
    <Card className="border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg tracking-tight flex items-center gap-2">
            {report.reason.replace(/_/g, " ")}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground gap-2">
            <Hash className="h-3 w-3" />
            <span className="font-mono">{report._id}</span>
          </div>
        </div>
        <Badge
          className={`capitalize shadow-none rounded-full px-3 ${getStatusVariant(report.status)}`}
        >
          {report.status}
        </Badge>
      </CardHeader>

      <Separator className="my-2 bg-border" />

      <CardContent className="grid gap-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Reporter Details</p>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-primary" />
              <span>{report.buyer.fullname}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <span>{report.buyer.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span>{report.buyer.phone}</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Submission Info</p>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{formatDate(report.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground text-xs">Last Updated:</span>
              <span className="text-xs">{formatDate(report.updatedAt)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ReportHistory = () => {
  const { data, isLoading } = useGetReports();

  if (isLoading) return <AppLoader />;

  const reports = data?.data?.reports || [];

  return (
    <div className="space-y-6 bg-background min-h-screen p-1">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1 tracking-tight">My Reports</h2>
        <p className="text-sm text-muted-foreground">
          Track the status and details of issues you have raised.
        </p>
      </div>

      <div className="space-y-4">
        {reports.length > 0 ? (
          reports.map((report) => (
            <ReportCard key={report._id} report={report} />
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-lg bg-muted/30">
            <p className="text-muted-foreground">No reports found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportHistory;