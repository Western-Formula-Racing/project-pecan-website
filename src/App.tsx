import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  Wifi, 
  Zap, 
  Globe, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Menu, 
  X, 
  Github,
  Monitor,
  Cable,
  Maximize2
} from 'lucide-react';

// --- Interfaces ---

interface Feature {
  icon: React.ElementType;
  title: string;
  desc: string;
  fullDesc: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  icon: React.ElementType;
}

interface FeatureCardProps extends Feature {
  onOpen: () => void;
}

// --- Components ---

const Modal = ({ isOpen, onClose, title, content, icon: Icon }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      <div className="relative bg-slate-900 border-2 border-[#9333ea] rounded-2xl max-w-2xl w-full shadow-2xl transform transition-all flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-[#ff0055]/10 rounded-lg">
                <Icon className="w-6 h-6 text-[#ff0055]" />
             </div>
             <h3 className="text-2xl font-bold text-white tracking-wide uppercase">{title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Image Area */}
        <div className="relative w-full h-64 bg-slate-950 flex items-center justify-center overflow-hidden group">
            {/* Placeholder for the requested image */}
            <img 
              src={`https://placehold.co/800x400/111/ff0055?text=${encodeURIComponent(title)}+Preview&font=roboto`} 
              alt={title} 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            {content}
          </p>
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-[#ff0055] hover:bg-[#d90049] text-white font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(255,0,85,0.3)]"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-[#0B0C10]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center space-x-3">
            {/* Logo styled like the image provided */}
            <div className="flex flex-col items-start">
                <span className="text-white font-black text-xl tracking-tighter italic uppercase" style={{ fontFamily: 'Arial, sans-serif' }}>
                    PROJECT <span className="text-[#9333ea]">PECAN</span>
                </span>
                <span className="text-[#9333ea] text-[0.6rem] tracking-[0.2em] font-bold uppercase">
                    A Western Formula Racing Open Source Project
                </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="text-slate-300 hover:text-[#9333ea] px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-wider">Features</a>
              <a href="#compare" className="text-slate-300 hover:text-[#9333ea] px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-wider">Compare</a>
              <a href="#specs" className="text-slate-300 hover:text-[#9333ea] px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-wider">Specs</a>
              {/* Sponsor (same highlighted style as former Start Now button) */}
              <a
                href="https://westernformularacing.org/Sponsors"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 inline-block bg-gradient-to-r from-[#9333ea] to-[#ff0055] hover:from-[#7e22ce] hover:to-[#d90049] text-white px-6 py-2 rounded-sm skew-x-[-10deg] text-sm font-bold transition-all shadow-[0_0_10px_rgba(147,51,234,0.4)] hover:shadow-[0_0_20px_rgba(147,51,234,0.6)]"
                aria-label="Sponsor Western Formula Racing"
              >
                <span className="block skew-x-[10deg] uppercase">Sponsor WFR</span>
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none">
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#0B0C10] border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
            <a href="#compare" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Comparison</a>
            <a href="#specs" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Specs</a>
              <a
                href="https://westernformularacing.org/Sponsors"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-left mt-1 bg-gradient-to-r from-[#9333ea] to-[#ff0055] text-white px-3 py-2 rounded-md text-base font-medium skew-x-[-6deg]"
              >
                <span className="block skew-x-[6deg] uppercase">Sponsor WFR</span>
              </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const ConsoleAnimation = () => {
  const [lines, setLines] = useState<Array<{text: string, color: string, id: number}>>([]);
  const [connectionText, setConnectionText] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<'hidden' | 'typing' | 'flashing' | 'connected'>('hidden');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    
    const startSequence = async () => {
      // Delay start
      await new Promise(r => setTimeout(r, 500));
      if (!isMounted) return;

      // Typing
      setConnectionStatus('typing');
      const targetText = "> CONNECTING: ws://192.168.4.1";
      for (let i = 0; i <= targetText.length; i++) {
        if (!isMounted) return;
        setConnectionText(targetText.slice(0, i));
        await new Promise(r => setTimeout(r, 30)); 
      }

      // Flashing
      if (!isMounted) return;
      setConnectionStatus('flashing');
      await new Promise(r => setTimeout(r, 1500));

      // Connected
      if (!isMounted) return;
      setConnectionStatus('connected');
      setConnectionText("> CONNECTED: ws://192.168.4.1");
    };

    startSequence();

    return () => { isMounted = false; };
  }, []);

  // Continuous CAN message stream
  useEffect(() => {
    if (connectionStatus !== 'connected') return;

    const canIds = ['0x400', '0x401', '0x402', '0x305', '0x500'];
    const MAX_LINES = 8; // Keep buffer manageable
    
    const interval = setInterval(() => {
      const randomId = canIds[Math.floor(Math.random() * canIds.length)];
      const randomData = Array.from({ length: 3 }, () => 
        Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
      ).join(' ');
      
      setLines(prev => {
        const newLine = {
          text: `> CAN_ID: ${randomId} [DATA: ${randomData} ...]`,
          color: "text-slate-400",
          id: prev.length
        };
        // Keep only the last MAX_LINES messages
        const updated = [...prev, newLine];
        return updated.slice(-MAX_LINES);
      });
    }, 400);

    return () => clearInterval(interval);
  }, [connectionStatus]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="col-span-2 bg-[#0B0C10] p-4 rounded border border-slate-800 h-32 relative text-xs font-mono flex flex-col">
        {/* Fixed connection status at top */}
        {connectionStatus !== 'hidden' && (
             <div className={`mb-1 ${
                connectionStatus === 'connected' ? 'text-green-500' : 
                connectionStatus === 'flashing' ? 'text-yellow-500 animate-pulse' : 'text-yellow-500'
             }`}>
                {connectionText}
                {connectionStatus === 'typing' && <span className="animate-pulse">_</span>}
             </div>
        )}
        {/* Scrollable message area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 opacity-80">
            {lines.map((line) => (
                <div key={line.id} className={line.color + " animate-in slide-in-from-left-2 duration-300 fade-in"}>
                    {line.text}
                </div>
            ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0B0C10] to-transparent pointer-events-none"></div>
    </div>
  );
};

const LiveDashboard = () => {
  const [rpm, setRpm] = useState(8450);
  const [temp, setTemp] = useState(42.5);
  const [throttle, setThrottle] = useState(88);
  const timeRef = useRef(10);
  const rpmRef = useRef(8450);
  const throttleRef = useRef(88);
  const [chartData, setChartData] = useState<Array<{time: number, rpm: number, throttle: number}>>(() => {
    // Initialize with 10 seconds of historical data
    const initialData = [];
    let currentRpm = 8450;
    let currentThrottle = 88;
    for (let i = 0; i < 10; i++) {
      // Generate realistic fluctuating data
      currentRpm = Math.min(Math.max(currentRpm + (Math.random() * 150 - 75), 8200), 8700);
      currentThrottle = Math.min(Math.max(currentThrottle + (Math.random() * 20 - 10), 50), 100);
      initialData.push({
        time: i,
        rpm: Math.round(currentRpm),
        throttle: Math.round(currentThrottle)
      });
    }
    return initialData;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRpm(prev => {
        const delta = Math.floor(Math.random() * 200) - 100;
        const newVal = prev + delta;
        // Clamp to realistic range (8200 - 8700)
        const clamped = Math.min(Math.max(newVal, 8200), 8700);
        rpmRef.current = clamped;
        return clamped;
      });

      setTemp(prev => {
         const delta = (Math.random() * 0.6) - 0.3;
         return Number((Math.max(40, Math.min(45, prev + delta))).toFixed(1));
      });
      
      // Throttle is more independent now
      setThrottle(prev => {
         // Random walk with larger variations
         const delta = Math.floor(Math.random() * 30) - 15;
         const newThrottle = Math.round(Math.max(30, Math.min(95, prev + delta)));
         throttleRef.current = newThrottle;
         return newThrottle;
      });

    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Update chart data every second
  useEffect(() => {
    const chartInterval = setInterval(() => {
      setChartData(prev => {
        const currentTime = timeRef.current;
        timeRef.current += 1;
        const newData = [...prev, { time: currentTime, rpm: rpmRef.current, throttle: throttleRef.current }];
        // Keep last 20 data points
        return newData.slice(-20);
      });
    }, 1000);
    return () => clearInterval(chartInterval);
  }, []);

  return (
      <div className="w-full relative rounded-lg bg-[#15161c] border border-slate-800 shadow-2xl overflow-hidden transform rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-500">
            {/* Header Bar */}
            <div className="bg-[#0f1014] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                 <span className="text-[#ff0055] font-bold uppercase tracking-widest text-xs">Diagnostic Dashboard</span>
                 <div className="h-4 w-[1px] bg-slate-700"></div>
                 <span className="text-slate-500 text-xs font-mono">ESP32_CLIENT_01</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              </div>
            </div>
            
            {/* Data Grid */}
            <div className="p-6 grid grid-cols-2 gap-4 font-mono">
                {/* RPM Gauge Simulation */}
                <div className="col-span-2 bg-[#0B0C10] p-4 rounded border border-slate-800 relative overflow-hidden">
                    <div className="text-slate-500 text-xs uppercase mb-1">Engine Speed</div>
                    <div className="text-4xl font-bold text-white flex items-baseline">
                        {rpm.toLocaleString()} <span className="text-sm text-slate-500 ml-2">RPM</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 mt-4 rounded-full overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-blue-600 to-[#ff0055] h-full transition-all duration-200 ease-out"
                            style={{ width: `${(rpm / 10000) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Stat Box 1 */}
                <div className="bg-[#0B0C10] p-4 rounded border border-slate-800">
                    <div className="text-slate-500 text-xs uppercase mb-1">Battery Temp</div>
                    <div className="text-2xl font-bold text-[#ff0055] transition-all duration-500">{temp.toFixed(1)}°C</div>
                </div>

                {/* Stat Box 2 */}
                <div className="bg-[#0B0C10] p-4 rounded border border-slate-800">
                    <div className="text-slate-500 text-xs uppercase mb-1">Throttle Input</div>
                    <div className="text-2xl font-bold text-blue-400">{throttle}%</div>
                </div>

                 {/* Console Log */}
                <ConsoleAnimation />

                {/* Live Chart */}
                <div className="col-span-2 bg-[#0B0C10] p-4 rounded border border-slate-800 h-48">
                    <div className="text-slate-500 text-xs uppercase mb-3">Live Telemetry</div>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis 
                                dataKey="time" 
                                stroke="#64748b" 
                                tick={{ fill: '#64748b', fontSize: 10 }}
                                label={{ value: 'Time (s)', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 10 }}
                            />
                            <YAxis 
                                yAxisId="left"
                                stroke="#3b82f6" 
                                tick={{ fill: '#64748b', fontSize: 10 }}
                                label={{ value: 'Throttle (%)', angle: -90, position: 'insideLeft', fill: '#3b82f6', fontSize: 10 }}
                            />
                            <YAxis 
                                yAxisId="right"
                                orientation="right"
                                stroke="#ff0055" 
                                tick={{ fill: '#64748b', fontSize: 10 }}
                                label={{ value: 'RPM', angle: 90, position: 'insideRight', fill: '#ff0055', fontSize: 10 }}
                                domain={[8000, 9000]}
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0B0C10', border: '1px solid #334155', borderRadius: '4px' }}
                                labelStyle={{ color: '#64748b', fontSize: 11 }}
                                itemStyle={{ fontSize: 11 }}
                            />
                            <Legend 
                                wrapperStyle={{ fontSize: 10 }}
                                iconType="line"
                            />
                            <Line 
                                yAxisId="left"
                                type="monotone" 
                                dataKey="throttle" 
                                stroke="#3b82f6" 
                                strokeWidth={2}
                                dot={false}
                                name="Throttle (%)"
                                isAnimationActive={false}
                            />
                            <Line 
                                yAxisId="right"
                                type="monotone" 
                                dataKey="rpm" 
                                stroke="#ff0055" 
                                strokeWidth={2}
                                dot={false}
                                name="RPM"
                                isAnimationActive={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
          </div>
  );
};

const Hero = () => {
  return (
    <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 bg-[#0B0C10] overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-[#9333ea]/5 blur-[120px] rounded-full pointer-events-none"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left mb-12 lg:mb-0">
          <div className="inline-flex items-center px-3 py-1 rounded-sm bg-[#9333ea]/10 text-[#9333ea] text-sm font-bold mb-6 border-l-4 border-[#9333ea] uppercase tracking-widest">
            <Wifi className="w-4 h-4 mr-2" />
            Wireless CAN Diagnostic
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter italic mb-6 uppercase leading-none">
            Vehicle Data <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9333ea] to-[#ff0055]">Unteathered</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 font-mono">
            Project Pecan provides an open source alternative to existing CAN diagnostic hardware. 
            ESP32-powered. React-based. WebSocket streaming. 
            <span className="text-[#9333ea]"> The new standard for FSAE & Automotive testing.</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-[#9333ea] to-[#ff0055] hover:from-[#7e22ce] hover:to-[#d90049] text-white text-lg font-bold shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all overflow-hidden skew-x-[-10deg]">
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out skew-x-[10deg]"></div>
              <span className="flex items-center justify-center skew-x-[10deg] uppercase">
                Initialize System <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </button>
            <button className="px-8 py-4 bg-transparent hover:bg-slate-800/50 text-slate-300 rounded-sm font-bold text-lg border border-slate-700 hover:border-[#9333ea] transition-all flex items-center justify-center skew-x-[-10deg]">
              <span className="flex items-center justify-center skew-x-[10deg] uppercase">
                <Github className="mr-2 h-5 w-5" /> Source Code
              </span>
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full perspective-1000">
          <LiveDashboard />
        </div>
      </div>
    </div>
  );
};
const FeatureCard = ({ icon: Icon, title, desc, onOpen }: FeatureCardProps) => (
  <div 
    onClick={onOpen}
    className="bg-[#15161c] group p-6 rounded-xl border border-slate-800 hover:border-[#ff0055] transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden"
  >
    {/* Hover Accent Line */}
    <div className="absolute top-0 left-0 w-full h-1 bg-[#ff0055] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    
    <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-[#0B0C10] rounded-lg flex items-center justify-center group-hover:bg-[#ff0055]/10 transition-colors">
            <Icon className="w-6 h-6 text-[#ff0055]" />
        </div>
        <Maximize2 className="w-4 h-4 text-slate-600 group-hover:text-[#ff0055] transition-colors opacity-0 group-hover:opacity-100" />
    </div>
    
    <h3 className="text-xl font-bold text-white mb-2 font-mono uppercase tracking-tight">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    
    <div className="mt-4 flex items-center text-[#ff0055] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
        View Details <ArrowRight className="ml-1 w-3 h-3" />
    </div>
  </div>
);

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const featuresList: Feature[] = [
    {
      icon: Wifi,
      title: "True Wireless",
      desc: "ESP32-powered telemetry. Analyze data without cables.",
      fullDesc: "Utilizing the ESP32's dual-core architecture, Project Pecan creates a dedicated high-bandwidth WiFi Access Point. Connect your laptop or tablet directly to the car's network. We've tested stable streaming at ranges up to 50 meters in noisy RF environments, perfect for pit lane diagnostics or dyno runs."
    },
    {
      icon: Globe,
      title: "Browser Native",
      desc: "Zero installs. React-based analyzer suite works in Chrome, Firefox, or Edge.",
      fullDesc: "Forget downloading 500MB packages or Windows-only software. Project Pecan serves the entire analysis suite directly from the hardware or a cloud host. If you have a modern browser, you have a full CAN analyzer. Compatible with Linux, macOS, Windows, Android, and iOS."
    },
    {
      icon: Zap,
      title: "WebSocket Stream",
      desc: "Ultra-low latency binary protocol for high-frequency bus loads.",
      fullDesc: "We don't just send JSON. We use a packed binary WebSocket protocol to ensure minimal overhead. This allows Project Pecan to visualize high-speed CAN buses (500kbps, 1Mbps) with minimal frame drops. CAN frames are decoaded in the browser, freeing up the ESP32's resources."
    },
    {
      icon: Terminal,
      title: "Open Firmware",
      desc: "Fully customizable frontend and firmware. Add your own filters and protocols.",
      fullDesc: "We provide the full source code for both the frontend and firmware. Need to implement a custom ISO-TP transport layer? Need to filter specific IDs at the hardware level to save bandwidth? Fork the repo, flash the ESP32, and make it yours."
    },
    {
      icon: Monitor,
      title: "Cross Platform",
      desc: "Debug your vehicle from an iPad, phone, or laptop.",
      fullDesc: "Because the client is just a website, your diagnostic tool is whatever device you have in your pocket. Mechanics can use tablets to toggle outputs while walking around the car. Engineers can use multi-monitor setups to view complex graphs. Responsiveness is built-in from day one."
    },
    {
      icon: Cpu,
      title: "Low Cost BOM",
      desc: "Under $50 Bill of Materials. Accessible for every team member.",
      fullDesc: "Traditional analyzers cost hundreds or thousands of dollars, limiting how many a team can own. Project Pecan uses off-the-shelf components: an ESP32 dev board and a SN65HVD230 transceiver. The total cost is often less than a team lunch, meaning every sub-team can have their own dedicated analyzer."
    }
  ];

  return (
    <div id="features" className="py-24 bg-[#0B0C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm text-[#9333ea] font-bold tracking-[0.2em] uppercase mb-3">System Capabilities</h2>
          <p className="mt-2 text-3xl md:text-4xl font-black uppercase italic text-white">
            Why Switch to Pecan?
          </p>
          <p className="mt-4 max-w-2xl text-lg text-slate-400 mx-auto">
            Professional grade diagnostics with a DIY price tag. Click any feature below to see more details.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, idx) => (
            <FeatureCard 
              key={idx} 
              {...feature} 
              onOpen={() => setSelectedFeature(feature)}
            />
          ))}
        </div>
      </div>

      {/* POPUP MODAL */}
      <Modal 
        isOpen={!!selectedFeature} 
        onClose={() => setSelectedFeature(null)} 
        title={selectedFeature?.title || ''}
        content={selectedFeature?.fullDesc || ''}
        icon={selectedFeature?.icon || Cpu}
      />

    </div>
  );
};

const Comparison = () => {
  return (
    <div id="compare" className="py-24 bg-[#15161c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-3xl font-black uppercase italic text-white sm:text-4xl">
            LEGACY <span className="text-slate-600 text-2xl not-italic align-middle px-2">vs</span> PECAN
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional */}
          <div className="bg-[#0B0C10] rounded-sm p-8 border border-slate-800 opacity-60 hover:opacity-80 transition-opacity">
            <h3 className="text-2xl font-bold text-slate-400 mb-6 flex items-center uppercase">
              <Cable className="w-6 h-6 mr-2" />
              Existing Tools
            </h3>
            <ul className="space-y-4 font-mono text-sm">
              <li className="flex items-center text-slate-500">
                <XCircle className="w-5 h-5 text-red-900 mr-3" />
                Costly
              </li>
              <li className="flex items-center text-slate-500">
                <XCircle className="w-5 h-5 text-red-900 mr-3" />
                Wired Tether
              </li>
              <li className="flex items-center text-slate-500">
                <XCircle className="w-5 h-5 text-red-900 mr-3" />
                Software Installation Required
              </li>
            </ul>
          </div>

          {/* Pecan */}
          <div className="bg-[#0B0C10] rounded-sm p-8 border-2 border-[#9333ea] shadow-[0_0_30px_rgba(147,51,234,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#9333ea] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
              Team Choice
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center uppercase italic">
              <Wifi className="w-6 h-6 mr-2 text-[#9333ea]" />
              Project Pecan
            </h3>
            <ul className="space-y-4 font-mono text-sm">
              <li className="flex items-center text-white">
                <CheckCircle2 className="w-5 h-5 text-[#9333ea] mr-3" />
                BOM &lt; $50
              </li>
              <li className="flex items-center text-white">
                <CheckCircle2 className="w-5 h-5 text-[#9333ea] mr-3" />
                Wireless Range
              </li>
              <li className="flex items-center text-white">
                <CheckCircle2 className="w-5 h-5 text-[#9333ea] mr-3" />
                Plug & Play
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechnicalSpecs = () => {
  return (
    <div id="specs" className="py-24 bg-[#0B0C10] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black uppercase italic text-white mb-6">Hardware Spec</h2>
            <p className="text-slate-400 mb-8">
                Engineered for reliability in the loop. 
            </p>
            
            <div className="space-y-6 font-mono">
              <div className="border-l-2 border-[#9333ea] pl-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">MCU</h4>
                <p className="text-slate-400">ESP32-WROOM-32E (Dual Core 240MHz)</p>
              </div>
              <div className="border-l-2 border-slate-700 pl-4 hover:border-[#9333ea] transition-colors">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">Transceiver</h4>
                <p className="text-slate-400">SN65HVD230 (3.3V CAN)</p>
              </div>
              <div className="border-l-2 border-slate-700 pl-4 hover:border-[#9333ea] transition-colors">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">Interface</h4>
                <p className="text-slate-400">WebSockets over 802.11 b/g/n</p>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center">
             <div className="w-full max-w-md aspect-video bg-[#15161c] border border-slate-800 relative p-6 shadow-2xl">
                 <div className="absolute top-2 left-2 text-[#9333ea] text-xs font-mono">PCB_V1.2</div>
                 {/* Stylized PCB Art */}
                 <div className="w-full h-full border border-dashed border-slate-700 flex items-center justify-center relative overflow-hidden">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#9333ea] blur-[60px] opacity-20"></div>
                     <Cpu className="w-24 h-24 text-slate-700 relative z-10" />
                     
                     {/* Traces */}
                     <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 50 50 L 100 50 L 150 100" stroke="#9333ea" strokeWidth="2" fill="none" />
                        <path d="M 300 200 L 250 200 L 200 150" stroke="#9333ea" strokeWidth="2" fill="none" />
                     </svg>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050508] border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-white font-black text-lg italic">PROJECT <span className="text-[#9333ea]">PECAN</span></span>
            </div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">
              Western Formula Racing <br/> Data Acquisition Subsystem
            </p>
          </div>
          {/* Links sections kept simple for brevity */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-mono">
              <li><a href="#" className="hover:text-[#9333ea]">Hardware</a></li>
              <li><a href="#" className="hover:text-[#9333ea]">Web App</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 text-xs font-mono">© 2025 Western Formula Racing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="bg-[#0B0C10] min-h-screen text-slate-200 font-sans selection:bg-[#9333ea] selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <Comparison />
      <TechnicalSpecs />
      <Footer />
    </div>
  );
};

export default App;
