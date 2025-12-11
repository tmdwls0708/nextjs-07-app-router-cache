import Messages from "@/components/messages";
import { getMessages } from "@/lib/messages";
import { unstable_noStore } from "next/cache";

// 페이지에 포함된 모든 요청에 staleTime 적용
// export const revalidate = 5;

// 페이지에 포함된 모든 요청을 캐시 설정하지 않음 (cache: "no-store") 설정과 같음
// 페이지 라우트도 캐시하지 않음 (페이지 접속할 때마다 렌더링 됨)
// export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  // 컴포넌트 범위 요청 캐시 설정하지 않음
  // unstable_noStore();

  // const response = await fetch("http://localhost:8080/messages", {
  //   // cache:'force-cache' // 데이터 캐시 사용
  //   // cache: "no-store", // 데이터 캐시 미사용
  //   // next: {
  //   //   revalidate: 5, // staleTime 5초
  //   // },
  //   next: {
  //     tags: ["nextTag"],
  //   },
  // });
  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
