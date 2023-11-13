'use client';
import {MutableRefObject, useEffect, useRef} from "react";
export default function IntersectionListener({loadMore}:{loadMore:any}){
	const observerRef:MutableRefObject<any> = useRef(null);
	useEffect(()=>{
		const target:HTMLElement|null = document.getElementById("infinite-scroller");
		if(target === null){return;}
		const intersectionHandler = (entries:any)=>{
			entries.forEach((entry:any)=>{
				if(entry.isIntersecting){loadMore();}
			});
		}
		const options = {root: null, rootMargin:"0px",threshold: 1}
		observerRef.current = new IntersectionObserver(intersectionHandler,options);
		if(observerRef.current === null){return;}
		observerRef.current.observe(target);
		return ()=>{observerRef.current.disconnect();};
	},[loadMore]);
	return(<div className={"w-fill h-4 bg-black"} id={"infinite-scroller"}/>);
}