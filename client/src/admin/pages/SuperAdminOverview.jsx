import React from 'react'
import { useGetSuperAdminDashboard } from '../hooks/superAdmin.hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Users,
  Store,
  Gavel,
  BrainCircuit,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Box
} from 'lucide-react'

const StatCard = ({ title, value, subtext, icon: Icon, trend, gradient }) => (
  <Card className="group relative overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className={`absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity bg-linear-to-br ${gradient}`} />
    <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-110 text-foreground">
      <Icon size={100} />
    </div>

    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
      <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </CardTitle>
      <div className="p-2 rounded-lg bg-secondary/80 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
    </CardHeader>

    <CardContent className="relative z-10">
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold tracking-tighter">{value ?? 0}</div>
        {trend > 0 && (
          <Badge className="bg-accent/20 text-accent border-none text-[10px] font-bold">
            +{trend}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <div className="h-1 w-8 rounded-full bg-secondary group-hover:w-12 group-hover:bg-primary transition-all duration-500" />
        <p className="text-[11px] font-medium text-muted-foreground truncate">
          {subtext}
        </p>
      </div>
    </CardContent>
  </Card>
)

const SuperAdminOverview = () => {
  const { data: response, isLoading } = useGetSuperAdminDashboard()

  if (isLoading) return <DashboardSkeleton />

  const d = response?.data

  const totalUsers =
    (d?.users?.farmers?.totalFarmers || 0) +
    (d?.users?.buyers?.totalBuyers || 0)

  const approvalRate =
    d?.marketplace?.listings?.totalListings > 0
      ? (
          (d?.marketplace?.listings?.approvedListings /
            d?.marketplace?.listings?.totalListings) *
          100
        ).toFixed(1)
      : 0

  const reportRisk =
    d?.marketplace?.reports?.totalReports > 0
      ? (
          (d?.marketplace?.reports?.pendingReports /
            d?.marketplace?.reports?.totalReports) *
          100
        ).toFixed(1)
      : 0

  const openQueryRatio =
    d?.governance?.queries?.totalQueries > 0
      ? (
          (d?.governance?.queries?.openQueries /
            d?.governance?.queries?.totalQueries) *
          100
        ).toFixed(1)
      : 0

  return (
    <div className="p-8 bg-background min-h-screen space-y-14">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            Super Admin <span className="text-primary">Control Center</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Platform governance, analytics & operational health.
          </p>
        </div>

        <div className="flex gap-3">
          <Badge variant="outline" className="px-4 py-2 flex gap-2 items-center">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Live System
          </Badge>

          <Badge className="bg-primary text-primary-foreground px-4 py-2">
            {totalUsers} Total Users
          </Badge>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 space-y-3">
            <p className="text-xs uppercase opacity-70 tracking-widest">
              Approval Rate
            </p>
            <div className="text-4xl font-black">{approvalRate}%</div>
            <p className="text-xs opacity-80">
              Listings successfully moderated
            </p>
          </CardContent>
        </Card>

        <Card className="bg-accent text-accent-foreground">
          <CardContent className="p-6 space-y-3">
            <p className="text-xs uppercase opacity-70 tracking-widest">
              Risk Exposure
            </p>
            <div className="text-4xl font-black">{reportRisk}%</div>
            <p className="text-xs opacity-80">
              Reports pending action
            </p>
          </CardContent>
        </Card>

        <Card className="bg-secondary">
          <CardContent className="p-6 space-y-3">
            <p className="text-xs uppercase text-muted-foreground tracking-widest">
              Open Queries
            </p>
            <div className="text-4xl font-black">
              {openQueryRatio}%
            </div>
            <p className="text-xs text-muted-foreground">
              Support backlog ratio
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">User Ecosystem</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            title="Farmers"
            value={d?.users?.farmers?.totalFarmers}
            trend={d?.users?.farmers?.newFarmers}
            subtext={`${d?.users?.farmers?.activeFarmers} Active`}
            icon={Users}
            gradient="from-primary/20 to-transparent"
          />

          <StatCard
            title="Buyers"
            value={d?.users?.buyers?.totalBuyers}
            trend={d?.users?.buyers?.newBuyers}
            subtext={`${d?.users?.buyers?.activeBuyers} Commercial`}
            icon={ShieldCheck}
            gradient="from-blue-500/20 to-transparent"
          />

          <StatCard
            title="Admins"
            value={d?.users?.admins?.totalAdmins}
            trend={d?.users?.admins?.recentAdmins}
            subtext="Operations Team"
            icon={Activity}
            gradient="from-accent/20 to-transparent"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <Store className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Marketplace Operations</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Total Listings"
            value={d?.marketplace?.listings?.totalListings}
            subtext={`${approvalRate}% Approved`}
            icon={Box}
            gradient="from-primary/20 to-transparent"
          />

          <StatCard
            title="Pending Moderation"
            value={d?.marketplace?.listings?.pendingListings}
            subtext="Requires review"
            icon={AlertCircle}
            gradient="from-destructive/20 to-transparent"
          />

          <StatCard
            title="Reports"
            value={d?.marketplace?.reports?.totalReports}
            trend={d?.marketplace?.reports?.newReports}
            subtext="Platform incidents"
            icon={Gavel}
            gradient="from-accent/20 to-transparent"
          />

          <StatCard
            title="Resolved Cases"
            value={d?.marketplace?.reports?.resolvedReports}
            subtext="Compliance success"
            icon={CheckCircle2}
            gradient="from-green-500/20 to-transparent"
          />
        </div>
      </section>

      <div className="grid xl:grid-cols-2 gap-8">
        <section className="bg-secondary/20 p-6 rounded-2xl border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Gavel className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Governance</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <StatCard
              title="Active Schemes"
              value={d?.governance?.schemes?.activeSchemes}
              subtext={`${d?.governance?.schemes?.totalSchemes} Total`}
              icon={Gavel}
              gradient="from-primary/20 to-transparent"
            />

            <StatCard
              title="User Queries"
              value={d?.governance?.queries?.totalQueries}
              subtext={`${d?.governance?.queries?.openQueries} Open`}
              icon={AlertCircle}
              gradient="from-accent/20 to-transparent"
            />
          </div>
        </section>

        <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
          <div className="flex items-center gap-3 mb-6">
            <BrainCircuit className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">AI Intelligence</h2>
          </div>

          <StatCard
            title="Predictions"
            value={d?.intelligence?.predictions?.totalPredictions}
            trend={d?.intelligence?.predictions?.newPredictions}
            subtext="Crop Intelligence Engine"
            icon={BrainCircuit}
            gradient="from-primary/20 to-transparent"
          />
        </section>
      </div>
    </div>
  )
}

const DashboardSkeleton = () => (
  <div className="p-8 space-y-12 bg-background">
    <div className="flex justify-between items-end pb-6 border-b border-border">
      <div className="space-y-3">
        <Skeleton className="h-10 w-64 bg-secondary" />
        <Skeleton className="h-4 w-96 bg-secondary" />
      </div>
      <Skeleton className="h-8 w-24 bg-secondary" />
    </div>

    {[1, 2, 3].map((i) => (
      <div key={i} className="space-y-6">
        <Skeleton className="h-6 w-40 bg-secondary" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((j) => (
            <Card key={j} className="border-border p-6 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-16 bg-secondary" />
                <Skeleton className="h-8 w-8 bg-secondary" />
              </div>
              <Skeleton className="h-10 w-24 bg-secondary" />
              <Skeleton className="h-3 w-full bg-secondary" />
            </Card>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default SuperAdminOverview
