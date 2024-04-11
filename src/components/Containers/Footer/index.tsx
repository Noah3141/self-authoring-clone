// import type { FC, SVGProps } from "react";

// import styles from "./index.module.css";
// import FooterItem, { type FooterItemProps } from "./FooterItem";
// import LinkedIn from "~/components/Icons/Social/LinkedIn";

// const footerItems: Record<string, FooterItemProps> = {
//     linkedin: {
//         icon: LinkedIn,
//         link: "https://www.linkedin.com/in/noah-steckley/",
//         text: "Noah Steckley",
//     },
// };

// const footerLinks: Record<string, FooterLink> = {};

// const Footer: FC = () => {
//     return (
//         <footer className={styles.footer}>
//             <div className={styles.sectionPrimary}>
//                 {footerItems.map((item) => (
//                     <FooterItem href={item.link} key={item.link}>
//                         {item.text}
//                     </FooterItem>
//                 ))}
//             </div>

//             <div className={styles.sectionSecondary}>
//                 <div className={styles.social}>
//                     {footerLinks.map((link) => {
//                         return (
//                             <FooterItem
//                                 key={link.icon}
//                                 href={link.link}
//                                 type="footer"
//                             >
//                                 <SocialIcon
//                                     width={20}
//                                     height={20}
//                                     aria-label={link.link}
//                                 />
//                             </FooterItem>
//                         );
//                     })}
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;
