'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ImagePlus, RotateCcw, Share2, X } from 'lucide-react';

const defaultFrame = {
  shape: 'circle',
  xPercent: 65,
  yPercent: 80,
  widthPercent: 100,
  heightPercent: 100,
};

function drawImageCover(context, image, x, y, width, height) {
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const sourceRatio = sourceWidth / sourceHeight;
  const targetRatio = width / height;
  let cropWidth = sourceWidth;
  let cropHeight = sourceHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceRatio > targetRatio) {
    cropWidth = sourceHeight * targetRatio;
    sourceX = (sourceWidth - cropWidth) / 2;
  } else {
    cropHeight = sourceWidth / targetRatio;
    sourceY = (sourceHeight - cropHeight) / 2;
  }

  context.drawImage(image, sourceX, sourceY, cropWidth, cropHeight, x, y, width, height);
}

export default function CreateShareGallery({ initialItems = [] }) {
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [frame, setFrame] = useState(defaultFrame);
  const [result, setResult] = useState(null);
  const [senderName, setSenderName] = useState('');
  const [working, setWorking] = useState(false);
  const [showStickyDone, setShowStickyDone] = useState(false);
  const canvasRef = useRef(null);
  const previewImageRef = useRef(null);
  const fileInputRef = useRef(null);
  const pendingMediaRef = useRef(null);
  const items = filter ? initialItems.filter((item) => item.mediaType === filter) : initialItems;

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo);
  }, [photo]);

  useEffect(() => {
    setShowStickyDone(false);
    if (!selected || !photo || result) return;
    const timer = setTimeout(() => setShowStickyDone(true), 5000);
    return () => clearTimeout(timer);
  }, [selected, photo, result]);

  useEffect(() => {
    const overlay = document.querySelector('img[alt="Your local photo"]');
    if (!overlay) return;
    overlay.style.width = `${frame.widthPercent || 100}px`;
    overlay.style.height = `${frame.heightPercent || 100}px`;
  }, [frame, photo]);

  const openMedia = (item) => {
    if (photo) URL.revokeObjectURL(photo);
    setSelected({ ...item, photoFrame: { ...defaultFrame } });
    setPhoto(null);
    setResult(null);
    setSenderName('');
    setFrame({ ...defaultFrame });
  };

  const choosePhoto = (item) => {
    pendingMediaRef.current = item;
    fileInputRef.current?.click();
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    const item = pendingMediaRef.current || selected;
    const currentName = selected?.id === item?.id ? senderName : '';
    event.target.value = '';
    if (!file || !item) return;
    openMedia(item);
    setSenderName(currentName);
    setPhoto(URL.createObjectURL(file));
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
      const overlay = document.querySelector('img[alt="Your local photo"]');
      const preview = previewImageRef.current || overlay?.parentElement?.querySelector('img:first-child');
      const previewWidth = preview?.clientWidth || canvas.width;
      const previewHeight = preview?.clientHeight || canvas.height;
      const x = canvas.width * (frame.xPercent || 0) / 100, y = canvas.height * (frame.yPercent || 0) / 100;
      const w = canvas.width * (frame.widthPercent || 100) / previewWidth;
      const h = canvas.height * (frame.heightPercent || 100) / previewHeight;
      context.save();
      if (frame.shape === 'circle') { context.beginPath(); context.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,Math.PI*2); context.clip(); }
      else if (frame.shape === 'rounded') { context.beginPath(); context.roundRect(x,y,w,h,Math.min(w,h)*.15); context.clip(); }
      drawImageCover(context, user, x, y, w, h);
      context.restore();
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

  const share = async () => {
    const name = senderName.trim() || 'Ek bhakt';
    const message = `${name} ne aapko ${selected.title} ka sandesh bheja hai`;
    const text = [message, selected?.shareText].filter(Boolean).join('\n');
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
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handlePhoto}/>
      <div className="mb-7 flex justify-center gap-2">{[['','All'],['image','Images'],['video','Videos']].map(([value,label])=><button key={label} onClick={()=>setFilter(value)} className={`rounded-full px-5 py-2 text-sm font-bold ${filter===value?'bg-[#6b2323] text-white':'bg-white text-[#6b2323] ring-1 ring-[#ead8c7]'}`}>{label}</button>)}</div>
      {!items.length ? <div className="rounded-2xl bg-white p-14 text-center text-slate-500">No active media available.</div> :
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.map((item)=><div key={item.id} className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-[#f1e4d6] transition hover:-translate-y-1 hover:shadow-xl"><div className={`relative h-[70vw] overflow-hidden bg-slate-100 sm:h-auto ${item.aspectRatio==='1:1'?'sm:aspect-square':item.aspectRatio==='4:5'?'sm:aspect-[4/5]':'sm:aspect-[9/16]'}`}><img src={item.thumbnailUrl} alt={item.title} className="h-full w-full object-cover transition group-hover:scale-105"/>{item.mediaType==='video'?<span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">Video</span>:<button onClick={()=>choosePhoto(item)} className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-2 rounded-xl bg-white/95 px-3 py-3 text-sm font-bold text-[#6b2323] shadow-lg backdrop-blur transition hover:bg-[#6b2323] hover:text-white"><ImagePlus size={17}/> Upload Your Own Photo</button>}</div><div className="p-4"><h2 className="font-serif text-lg font-bold text-[#351112]">{item.title}</h2><p className="mt-1 text-xs text-slate-500">{item.category}</p></div></div>)}</div>}
      {result&&selected&&<div className="create-share-done-bar fixed inset-x-0 bottom-0 z-[90] border-t border-[#ead8c7] bg-[#fffaf5]/95 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(53,17,18,.12)] backdrop-blur"><div className="mx-auto flex max-w-4xl items-center gap-3"><button onClick={share} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#762626] px-6 py-4 text-lg font-bold text-white shadow-lg"><Share2 size={20}/> Share</button><button onClick={()=>choosePhoto(selected)} className="rounded-lg px-3 py-3 text-sm font-semibold text-[#6b2323] underline underline-offset-4">Edit</button></div></div>}
      {selected && <div className="fixed inset-0 z-[80] overflow-y-auto bg-[#fffaf5]"><div className="min-h-screen w-full"><div className="sticky top-0 z-20 border-b border-[#ead8c7] bg-[#fffaf5]/95 px-4 py-3 backdrop-blur sm:px-6"><div className="mx-auto flex max-w-4xl items-start gap-3"><label className="min-w-0 flex-1 text-xs font-semibold text-[#351112]">Name<input value={senderName} onChange={(e)=>setSenderName(e.target.value.slice(0,60))} placeholder="Apna naam likhen" className="mt-1 w-full rounded-lg border border-[#e5d3c1] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-[#6b2323]"/></label><button onClick={()=>setSelected(null)} aria-label="Close editor" className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#e5d3c1] bg-white"><X/></button></div></div><div className={`mx-auto max-w-4xl px-4 py-5 sm:px-6 ${photo&&!result?'pb-36':''}`}><div className="relative mx-auto w-fit max-w-full overflow-hidden rounded-xl bg-slate-100"><img src={selected.mediaUrl} alt={selected.title} className="h-auto max-h-[calc(70vh+70px)] max-w-full object-contain sm:max-h-[70vh]"/>{photo&&<img src={photo} alt="Your local photo" className="absolute object-cover ring-2 ring-white" style={{left:`${frame.xPercent}%`,top:`${frame.yPercent}%`,width:`${frame.widthPercent}%`,height:`${frame.heightPercent}%`,borderRadius:frame.shape==='circle'?'999px':frame.shape==='rounded'?'16%':'0'}}/>}</div>{photo&&!result&&<><div className="mt-5 grid gap-3 sm:grid-cols-2"><label className="text-xs text-slate-600">Shape<select value={frame.shape} onChange={(e)=>setFrame({...frame,shape:e.target.value})} className="mt-1 w-full rounded-lg border bg-white p-2"><option value="circle">Circle</option><option value="rounded">Rounded</option><option value="square">Square</option></select></label>{[['xPercent','X position'],['yPercent','Y position'],['widthPercent','Width'],['heightPercent','Height']].map(([key,label])=><label key={key} className="text-xs text-slate-600">{label}: {Math.round(frame[key])}%<input type="range" min={key.includes('width')||key.includes('height')?5:0} max="100" value={frame[key]} onChange={(e)=>setFrame({...frame,[key]:Number(e.target.value)})} className="mt-2 w-full accent-[#6b2323]"/></label>)}</div><button onClick={()=>setFrame({...defaultFrame,...(selected.photoFrame||{})})} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#6b2323]"><RotateCcw size={13}/> Reset position</button></>}{result&&<div className="mt-5 flex items-center justify-center gap-4"><button onClick={share} className="inline-flex min-w-48 items-center justify-center gap-2 rounded-xl bg-[#6b2323] px-7 py-4 text-lg font-bold text-white shadow-lg"><Share2 size={20}/> Share</button><button onClick={()=>choosePhoto(selected)} className="text-sm font-semibold text-[#6b2323] underline underline-offset-4">Edit</button></div>}{result&&<p className="mt-3 text-center text-xs text-slate-500">Your photo stays in this browser and is never uploaded or saved in the database.</p>}<canvas ref={canvasRef} className="hidden"/></div>{showStickyDone&&<div className="create-share-done-bar fixed inset-x-0 bottom-0 z-30 border-t border-[#ead8c7] bg-[#fffaf5]/95 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(53,17,18,.12)] backdrop-blur"><div className="mx-auto max-w-4xl"><button onClick={done} disabled={working} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#762626] px-6 py-4 text-lg font-bold text-white shadow-lg"><Check size={21}/> {working?'Creating…':'Done'}</button><p className="mt-2 text-center text-xs text-slate-500">Your photo stays in this browser and is never uploaded or saved in the database.</p></div></div>}</div></div>}
    </div>
  );
}
