import type { FC, PropsWithChildren } from "react";
import Image from "next/image";
import styles from "./layouts.module.css";
import Footer from "~/components/Containers/Footer";

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <Image
            src={"/static/hand-writing.jpeg"}
            alt=""
            width={4000}
            height={300}
        />
        <div className={styles.homeLayout}>
            {children}
            <Footer />
        </div>
    </>
);

export default HomeLayout;
