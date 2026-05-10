import Image from "next/image";
import Link from "next/link";

export function Avatar() {
  return (
    <Link href="/taka7beckham" className="shrink-0">
      <figure className="isolate overflow-hidden rounded-full">
        <Image src="/shared/face.webp" alt="avatar" width={46} height={46} />
      </figure>
    </Link>
  );
}
