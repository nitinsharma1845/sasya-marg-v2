import React from 'react';
import { 
  Users, 
  Sprout, 
  MessageSquare, 
  AlertCircle, 
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { useGetAdminDashboard } from '../hooks/admin.hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const AdminOverviewPage = () => {
  const { data: rawResponse, isLoading } = useGetAdminDashboard();
  const stats = rawResponse?.data?.stats;
  const recent = rawResponse?.data?.recent;

  if (isLoading) return <DashboardSkeleton />;

  const activeFarmerPercent = Math.round((stats?.users.farmers.active / stats?.users.farmers.total) * 100) || 0;
  const pendingListingPercent = Math.round((stats.listings.preHarvest.pending / stats.listings.preHarvest.total) * 100) || 0;

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-background min-h-screen text-foreground overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="max-w-full">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight wrap-break-word">Sasya Marg Overview</h1>
          <p className="text-muted-foreground font-medium text-sm md:text-base">System performance and moderation control.</p>
        </div>
        <Badge variant="outline" className="w-fit px-4 py-1 border-primary text-primary bg-secondary/50 backdrop-blur-sm shrink-0">
          System Status: Operational
        </Badge>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Farmers" 
          value={stats?.users.farmers.total} 
          subValue={`${activeFarmerPercent}% Activity Rate`} 
          icon={<Users className="w-5 h-5" />} 
        />
        <StatCard 
          title="Pending Listings" 
          value={stats.listings.preHarvest.pending} 
          subValue={`${pendingListingPercent}% of total harvest`} 
          icon={<Sprout className="w-5 h-5" />} 
          highlight={stats.listings.preHarvest.pending > 0}
        />
        <StatCard 
          title="Market Products" 
          value={stats.listings.products.total} 
          subValue="Verified Listings" 
          icon={<ShieldCheck className="w-5 h-5" />} 
        />
        <StatCard 
          title="Open Queries" 
          value={stats.queries.buyerQueries.open + stats.queries.farmerQueries.open} 
          subValue="Urgent response needed" 
          icon={<MessageSquare className="w-5 h-5" />} 
          destructive={stats.queries.buyerQueries.open > 5}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-7">
        <Card className="md:col-span-4 border-border shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="pr-2">
              <CardTitle className="text-lg md:text-xl">Moderation Queue</CardTitle>
              <CardDescription className="text-xs md:text-sm">Recent pre-harvest listings</CardDescription>
            </div>
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <ArrowUpRight className="text-primary w-4 h-4 md:w-5 md:h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recent.listings.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-muted/50 hover:bg-secondary transition-colors border border-transparent hover:border-border group gap-3">
                  <div className="flex items-center gap-3 md:gap-4 min-w-0">
                    <div className="p-2 bg-card rounded-lg border border-border shrink-0">
                      <Sprout className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate uppercase">{item.title}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground truncate">
                        {item.moderation} • {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-primary text-primary-foreground text-[10px] md:text-xs shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    Review
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-border bg-linear-to-b from-card to-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive text-lg">
              <AlertCircle className="w-5 h-5 shrink-0" />
              Fraud Reports
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">Reported buyer activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recent.queries.buyersReports.slice(0, 5).map((report) => (
                <div key={report._id} className="group relative overflow-hidden rounded-lg border border-border p-3 md:p-4 bg-card transition-colors">
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <Badge variant="destructive" className="text-[9px] md:text-[10px] font-bold uppercase py-0 px-2 whitespace-nowrap">
                       {report.reason.replace('_', ' ')}
                    </Badge>
                    <span className="text-[9px] md:text-[10px] text-muted-foreground whitespace-nowrap">{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs md:text-sm text-foreground leading-relaxed italic line-clamp-2 wrap-break-word">
                    {report.description || "Suspected fraudulent activity detected."}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subValue, icon, highlight, destructive }) => (
  <Card className={`relative overflow-hidden border-border transition-all ${highlight ? 'border-accent/50 bg-accent/5' : ''}`}>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
      <div className={`p-1.5 md:p-2 rounded-lg shrink-0 ${destructive ? 'bg-destructive text-destructive-foreground' : 'bg-secondary text-primary'}`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl md:text-3xl font-bold tracking-tighter">{value}</div>
      <p className={`text-[10px] md:text-xs mt-1 font-medium truncate ${destructive ? 'text-destructive' : 'text-muted-foreground'}`}>
        {subValue}
      </p>
    </CardContent>
  </Card>
);

const DashboardSkeleton = () => (
  <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-background min-h-screen">
    <div className="space-y-3">
      <Skeleton className="h-8 md:h-10 w-48 md:w-64 bg-secondary" />
      <Skeleton className="h-4 w-full max-w-[384px] bg-secondary" />
    </div>
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-28 md:h-32 w-full rounded-2xl bg-secondary" />
      ))}
    </div>
    <div className="grid gap-6 grid-cols-1 md:grid-cols-7">
      <Skeleton className="md:col-span-4 h-88 md:h-113 rounded-2xl bg-secondary" />
      <Skeleton className="md:col-span-3 h-88 md:h-113 rounded-2xl bg-secondary" />
    </div>
  </div>
);

export default AdminOverviewPage;