import{c as l,j as e,h as c,N as n,O as o}from"./index-bTIcsV6i.js";import{u as r}from"./auth-ChCL8hii.js";import{U as d}from"./users-IVzEa8V_.js";import{C as x}from"./car-aYsrFmGW.js";import{C as h}from"./calendar-TYBRlM62.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=l("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=l("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=l("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=l("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=l("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=l("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=l("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),p=()=>{const{signOut:a}=r(),s=[{to:"/admin",icon:e.jsx(g,{}),label:"Dashboard"},{to:"/admin/clients",icon:e.jsx(d,{}),label:"Clients"},{to:"/admin/fleet",icon:e.jsx(x,{}),label:"Fleet"},{to:"/admin/crew",icon:e.jsx(u,{}),label:"Crew"},{to:"/admin/bookings",icon:e.jsx(h,{}),label:"Bookings"},{to:"/admin/testimonials",icon:e.jsx(y,{}),label:"Testimonials"},{to:"/admin/settings",icon:e.jsx(f,{}),label:"Settings"}];return e.jsx("aside",{className:"w-64 bg-black border-r border-zinc-800",children:e.jsxs("div",{className:"h-full flex flex-col",children:[e.jsxs("div",{className:"p-6",children:[e.jsx("h1",{className:"text-2xl font-serif text-white",children:"BG Diplomat"}),e.jsx("p",{className:"text-sm text-gray-400 mt-1",children:"Admin Dashboard"})]}),e.jsx("nav",{className:"flex-1 px-4",children:s.map(t=>e.jsxs(c,{to:t.to,end:t.to==="/admin",className:({isActive:i})=>`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${i?"bg-gold text-black":"text-gray-400 hover:text-white hover:bg-zinc-900"}`,children:[t.icon,e.jsx("span",{children:t.label})]},t.to))}),e.jsx("div",{className:"p-4 border-t border-zinc-800",children:e.jsxs("button",{onClick:()=>a(),className:"flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors",children:[e.jsx(j,{}),e.jsx("span",{children:"Sign Out"})]})})]})})},v=()=>{var s;const{profile:a}=r();return e.jsx("header",{className:"bg-black border-b border-zinc-800 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:"flex items-center gap-4 flex-1",children:e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(b,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",size:20}),e.jsx("input",{type:"text",placeholder:"Search...",className:"w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gold"})]})}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("button",{className:"relative p-2 text-gray-400 hover:text-white transition-colors",children:[e.jsx(m,{size:20}),e.jsx("span",{className:"absolute top-1 right-1 w-2 h-2 bg-gold rounded-full"})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"text-right",children:[e.jsx("p",{className:"text-sm font-medium text-white",children:a==null?void 0:a.full_name}),e.jsx("p",{className:"text-xs text-gray-400 capitalize",children:a==null?void 0:a.role})]}),a!=null&&a.avatar_url?e.jsx("img",{src:a.avatar_url,alt:a.full_name,className:"w-8 h-8 rounded-full object-cover"}):e.jsx("div",{className:"w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-medium",children:(s=a==null?void 0:a.full_name)==null?void 0:s[0]})]})]})]})})},C=()=>{const{user:a,profile:s,isLoading:t}=r();return t?e.jsx("div",{className:"min-h-screen bg-zinc-900 flex items-center justify-center",children:e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"})}):!a||!s||!["admin","manager"].includes(s.role)?e.jsx(n,{to:"/login",replace:!0}):e.jsxs("div",{className:"min-h-screen bg-zinc-900 flex",children:[e.jsx(p,{}),e.jsxs("div",{className:"flex-1 flex flex-col",children:[e.jsx(v,{}),e.jsx("main",{className:"flex-1 p-6 overflow-auto",children:e.jsx(o,{})})]})]})};export{C as default};
