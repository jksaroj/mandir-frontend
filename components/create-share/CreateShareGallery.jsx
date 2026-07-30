'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, Download, ImagePlus, RotateCcw, Share2, X } from 'lucide-react';

const defaultFrame = {
  shape: 'circle',
  xPercent: 65,
  yPercent: 12,
  widthPercent: 25,
  heightPercent: 14,
};

export default function CreateShareGallery({ initialItems = [] }) {
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [frame, setFrame] = useState(defaultFrame);
  const [result, setResult] = useState(null);
  const [working, setWorking] = useState(false);
  const canvasRef = useRef(null);
  const items = filter ? initialItems.filter((item) => item.mediaType === filter) : initialItems;

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo);
  }, [photo]);

  const openMedia = (item) => {
    if (photo) URL.revokeObjectURL(photo);
    setSelected(item);
    setPhoto(null);
    setResult(null);
    setFrame({ ...defaultFrame, ...(item.photoFrame || {}) });
  };

  const compose = async () => {
    if (!selected || selected.mediaType !== 'image') return null;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const background = new Image();
    background.crossOrigin = 'anonymous';
    background.src = selected.mediaUrl;
    await background.decode();
    canvas.width = background.naturalWidth; canvas.height = background.naturalHeight;
    context.drawImage(background, 0, 0);
    if (photo) {
      const user = new Image(); user.src = photo; await user.decode();
      const x = canvas.width * (frame.xPercent || 0) / 100, y = canvas.height * (frame.yPercent || 0) / 100;
      const w = canvas.width * (frame.widthPercent || 25) / 100, h = canvas.height * (frame.heightPercent || 14) / 100;
      context.save();
      if (frame.shape === 'circle') { context.beginPath(); context.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,Math.PI*2); context.clip(); }
      else if (frame.shape === 'rounded') { context.beginPath(); context.roundRect(x,y,w,h,Math.min(w,h)*.15); context.clip(); }
      context.drawImage(user,x,y,w,h); context.restore();
    }
    return new Promise((resolve, reject) => canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error('Image could not be created.')),
      'image/png'
    ));
  };

  const done = async () => {
    if (!photo) return;
    setWorking(true);
    try { setResult(await compose()); }
    finally { setWorking(false); }
  };

  const download = async () => {
    const blob = result || await compose();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${selected.name || 'brahmatatva'}.png`;
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const share = async () => {
    const text = selected?.shareText || selected?.title || '';
    const pageUrl = `${window.location.origin}/create-and-share/${selected.id}`;
    const blob = selected.mediaType === 'image' ? (result || await compose()) : null;
    const file = blob ? new File([blob], `${selected.name || 'brahmatatva'}.png`, { type: 'image/png' }) : null;
    if (navigator.share) {
      const shareData = { title: selected.title, text: `${text}\n${pageUrl}`.trim(), url: pageUrl };
      if (file && navigator.canShare?.({ files: [file] })) shareData.files = [file];
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(`${text}\n${pageUrl}`.trim());
    }
  };

  return (
    <div>
      <div className="mb-7 flex justify-center gap-2">{[['','All'],['image','Images'],['video','Videos']].map(([value,label])=><button key={label} onClick={()=>setFilter(value)} className={`rounded-full px-5 py-2 text-sm font-bold ${filter===value?'bg-[#6b2323] text-white':'bg-white text-[#6b2323] ring-1 ring-[#ead8c7]'}`}>{label}</button>)}</div>
      {!items.length ? <div className="rounded-2xl bg-white p-14 text-center text-slate-500">No active media available.</div> :
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.map((item)=><button key={item.id} onClick={()=>openMedia(item)} className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-[#f1e4d6] transition hover:-translate-y-1 hover:shadow-xl"><div className={`relative overflow-hidden bg-slate-100 ${item.aspectRatio==='1:1'?'aspect-square':item.aspectRatio==='4:5'?'aspect-[4/5]':'aspect-[9/16]'}`}><img src={item.thumbnailUrl} alt={item.title} className="h-full w-full object-cover transition group-hover:scale-105"/>{item.mediaType==='video'&&<span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">Video</span>}</div><div className="p-4"><h2 className="font-serif text-lg font-bold text-[#351112]">{item.title}</h2><p className="mt-1 text-xs text-slate-500">{item.category}</p></div></button>)}</div>}
      {selected && <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/80 p-3"><div className="mx-auto my-4 max-w-4xl rounded-2xl bg-[#fffaf5] p-4 sm:p-6"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-serif text-xl font-bold text-[#351112]">{selected.title}</h2><Link href={`/create-and-share/${selected.id}`} className="text-xs text-[#9b5252]">Open direct link</Link></div><button onClick={()=>setSelected(null)}><X/></button></div>{selected.mediaType==='video'?<video src={selected.mediaUrl} poster={selected.thumbnailUrl} controls className="mx-auto max-h-[65vh] w-full rounded-xl"/>:<><div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl bg-slate-100"><img src={selected.mediaUrl} alt={selected.title} className="h-auto w-full"/>{photo&&<img src={photo} alt="Your local photo" className="absolute object-cover ring-2 ring-white" style={{left:`${frame.xPercent}%`,top:`${frame.yPercent}%`,width:`${frame.widthPercent}%`,height:`${frame.heightPercent}%`,borderRadius:frame.shape==='circle'?'999px':frame.shape==='rounded'?'16%':'0'}}/>}</div>{photo&&<div className="mt-5 grid gap-3 sm:grid-cols-2"><label className="text-xs text-slate-600">Shape<select value={frame.shape} onChange={(e)=>{setFrame({...frame,shape:e.target.value});setResult(null);}} className="mt-1 w-full rounded-lg border bg-white p-2"><option value="circle">Circle</option><option value="rounded">Rounded</option><option value="square">Square</option></select></label>{[['xPercent','X position'],['yPercent','Y position'],['widthPercent','Width'],['heightPercent','Height']].map(([key,label])=><label key={key} className="text-xs text-slate-600">{label}: {Math.round(frame[key])}%<input type="range" min={key.includes('width')||key.includes('height')?5:0} max="100" value={frame[key]} onChange={(e)=>{setFrame({...frame,[key]:Number(e.target.value)});setResult(null);}} className="mt-2 w-full accent-[#6b2323]"/></label>)}</div>}</>}<div className="mt-5 flex flex-wrap gap-2">{selected.mediaType==='image'&&<label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold"><ImagePlus size={16}/> Choose your photo<input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e)=>{const file=e.target.files?.[0];if(file){if(photo)URL.revokeObjectURL(photo);setPhoto(URL.createObjectURL(file));setResult(null);}}}/></label>}{photo&&<button onClick={()=>{setFrame({...defaultFrame,...(selected.photoFrame||{})});setResult(null);}} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold"><RotateCcw size={16}/> Reset</button>}{photo&&!result&&<button onClick={done} disabled={working} className="inline-flex items-center gap-2 rounded-lg bg-[#6b2323] px-4 py-2 text-sm font-bold text-white"><Check size={16}/> {working?'Creating…':'Done'}</button>}{result&&<button onClick={download} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold"><Download size={16}/> Download</button>}<button onClick={share} disabled={selected.mediaType==='image'&&!result} className="inline-flex items-center gap-2 rounded-lg bg-[#6b2323] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"><Share2 size={16}/> Share</button></div><p className="mt-3 text-xs text-slate-500">Your photo stays in this browser and is never uploaded or saved in the database.</p><canvas ref={canvasRef} className="hidden"/></div></div>}
    </div>
  );
}
