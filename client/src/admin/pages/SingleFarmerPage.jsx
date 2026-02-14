import React from 'react'
import { useGetFarmerById } from '../hooks/superAdmin.hooks'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  User, Phone, Mail, MapPin, Calendar, CheckCircle2, 
  ShieldAlert, Droplets, LandPlot, Sprout, Coins, 
  Info, EyeOff, Eye, Tractor, Fingerprint, ShieldCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'

const DataPlaceholder = ({ text = "Not Provided" }) => (
  <span className="text-muted-foreground/40 italic text-xs flex items-center gap-1 font-normal">
    <Info size={12} /> {text}
  </span>
)

const InfoBox = ({ icon: Icon, label, value, colorClass }) => (
  <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border transition-all hover:border-primary/30 shadow-sm">
    <div className={cn("p-3 rounded-xl border flex items-center justify-center shadow-sm", colorClass)}>
      <Icon size={20} />
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
      <span className="text-sm font-semibold truncate mt-0.5">
        {value || <DataPlaceholder />}
      </span>
    </div>
  </div>
)

const SingleFarmerPage = () => {
  const { farmerId } = useParams()
  const { data: response, isPending } = useGetFarmerById(farmerId)

  if (isPending) return (
    <div className="p-8 space-y-6 animate-pulse max-w-6xl mx-auto">
      <div className="h-32 w-full bg-secondary rounded-4xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-64 bg-secondary rounded-4xl" />
        <div className="h-64 md:col-span-2 bg-secondary rounded-4xl" />
      </div>
    </div>
  )

  const farmer = response?.data || {}
  const farmlands = farmer.farmlands || []

  return (
    <div className="p-6 md:p-10 min-h-screen bg-background text-foreground max-w-7xl mx-auto space-y-8">
      
      {/* 1. Header Hero Section */}
      <div className="relative overflow-hidden bg-card p-8 rounded-[2.5rem] border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <Tractor size={180} className="absolute -right-10 -bottom-10 text-primary opacity-[0.03] pointer-events-none" />
        
        <div className="flex items-center gap-6 z-10">
          <div className="h-20 w-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
            <User size={42} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight">{farmer.fullname || <DataPlaceholder text="Unnamed Farmer" />}</h1>
              {farmer.isVarified && (
                <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20 flex items-center gap-1 font-bold">
                  <CheckCircle2 size={12} /> Verified Producer
                </Badge>
              )}
              <Badge variant={farmer.isActive ? "outline" : "destructive"} className={cn("px-3 py-1 font-bold", farmer.isActive && "border-primary text-primary bg-primary/5")}>
                {farmer.isActive ? "Active Account" : "Suspended"}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
               <span className="flex items-center gap-1"><Calendar size={14}/> Joined {new Date(farmer.createdAt).toLocaleDateString()}</span>
               <span className="flex items-center gap-1 font-mono text-xs bg-muted px-2 py-0.5 rounded-md"><Fingerprint size={12}/> {farmer._id}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Contact & Stats */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold flex items-center gap-2 px-2 text-primary">
            <ShieldCheck size={20} /> Personal Profile
          </h2>
          <div className="flex flex-col gap-4">
            <InfoBox 
              icon={Phone} 
              label="Contact Number" 
              value={farmer.phone} 
              colorClass="bg-primary/5 text-primary border-primary/10" 
            />
            <InfoBox 
              icon={Mail} 
              label="Email Address" 
              value={farmer.email} 
              colorClass="bg-primary/5 text-primary border-primary/10" 
            />
            
            {/* Visibility Card */}
            <div className="p-5 rounded-2xl bg-card border border-border flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary rounded-lg text-muted-foreground">
                        {farmer.isContactVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                    </div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Visibility</span>
                </div>
                <Badge variant="outline" className="text-[10px] uppercase">{farmer.isContactVisible ? "Public" : "Private"}</Badge>
            </div>
          </div>

          {/* Block Reason if any */}
          {farmer.blockReason && (
            <Card className="rounded-4xl border-destructive/20 bg-destructive/5 overflow-hidden">
                <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase text-destructive">
                        <ShieldAlert size={16} /> Governance Restriction
                    </div>
                    <p className="text-sm italic text-destructive/80 font-medium">"{farmer.blockReason}"</p>
                </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Farmlands Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold flex items-center gap-2 text-primary">
                <LandPlot size={20} /> Registered Farmlands
            </h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary">{farmlands.length} Plots</Badge>
          </div>

          {farmlands.length === 0 ? (
            <div className="py-20 border-2 border-dashed border-border rounded-[2.5rem] flex flex-col items-center justify-center text-muted-foreground bg-secondary/10">
                <Sprout size={48} className="opacity-20 mb-4" />
                <p>No farmlands registered to this profile</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {farmlands.map((plot) => (
                <Card key={plot._id} className="rounded-4xl border-border overflow-hidden group hover:border-primary/40 transition-all shadow-sm">
                   <div className="p-6 bg-secondary/20 border-b border-border flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-card rounded-xl border border-border text-primary">
                                <LandPlot size={18} />
                            </div>
                            <span className="font-bold">{plot.name || "Untitled Plot"}</span>
                        </div>
                        <Badge className={cn("text-[10px] uppercase", plot.isActive ? "bg-primary" : "bg-muted text-muted-foreground")}>
                            {plot.isActive ? "Active" : "Fallow"}
                        </Badge>
                   </div>
                   <CardContent className="p-6 space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Area Size</p>
                                <p className="text-sm font-bold">{plot.size?.value} {plot.size?.unit}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Budget Est.</p>
                                <p className="text-sm font-bold text-primary">₹{plot.budget?.toLocaleString()}</p>
                            </div>
                        </div>

                        <Separator className="bg-border/50" />

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-2"><Sprout size={14}/> Soil Type</span>
                                <span className="font-semibold capitalize">{plot.soilType}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-2"><Droplets size={14}/> Water Source</span>
                                <span className="font-semibold">{plot.water?.source}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-2"><MapPin size={14}/> Location</span>
                                <span className="font-semibold">{plot.location?.locality}, {plot.location?.district}</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Badge variant="outline" className="w-full justify-center py-1.5 border-primary/20 text-primary bg-primary/5 uppercase text-[9px] tracking-widest font-bold">
                                {plot.farmingType} Farming
                            </Badge>
                        </div>
                   </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleFarmerPage