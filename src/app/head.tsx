import { assetPath } from "@/lib/assets";

export default function Head() {
  const ymId = process.env.NEXT_PUBLIC_YM_ID;

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={assetPath("/images/hero-mountains.png")}
      />
      {ymId ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${ymId}', 'ym');

              ym(${ymId}, 'init', {
                  defer: true,
                  ssr: true,
                  webvisor: true,
                  clickmap: true,
                  ecommerce: "dataLayer",
                  accurateTrackBounce: true,
                  trackLinks: true,
                  trackHash: true
              });
            `,
          }}
        />
      ) : null}
    </>
  );
}
