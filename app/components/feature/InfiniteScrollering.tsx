'use client';//CSR
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {useEffect} from "react";
const queryClient = new QueryClient();
export default function InfiniteScrollTable({src,index}:{src:string,index:number}){
	return(
	<QueryClientProvider client={queryClient}>
		<RQInfiniteScrollTable src={[src,index].join("/").trim()}/>
	</QueryClientProvider>
	);
}
function RQInfiniteScrollTable({src}:{src:string}){
	useEffect(()=>{
		const observer = new IntersectionObserver((entries)=>{
			if(entries[0].isIntersecting){

			}
		})
	},[]);
	const {isLoading,error,data} = useQuery(["repoData"],()=>
		fetch(src).then((res)=>res.json())
	);//fetch
	if(isLoading){return "Loading...";}
	if(error){return "error has occurred.";}
	return(
	<div>
		<h1>{data.title}</h1>
	</div>
	);
}