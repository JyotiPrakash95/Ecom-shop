import Style from "./errorPage.module.css"
export default function ErrorPage() {
    return (
      <div className={Style.container}>
        <div className={Style.heading}>404</div>
        <div className={Style.subheading}>
          Oops! You've landed on the wrong page.
        </div>
        <a href="javascript:history.back()" className={Style.backButton}>
          Go back to previous page
        </a>
      </div>
    );
}