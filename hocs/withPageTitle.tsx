import { ComponentType, memo, useEffect } from "react";
import { APP_NAME } from "../constants/layout";
import usePageTitle from "../hooks/store/usePageTitle";

export const withPageTitle = <Props extends {}>(
  pageTitle: string,
  PageComponent: ComponentType<Props>
) =>
  memo((props: Props) => {
    const [, setPageTitle] = usePageTitle();

    useEffect(() => {
      if (pageTitle) {
        setPageTitle(pageTitle);

        document.title = `${APP_NAME} - ${pageTitle}`;
      }
    }, [setPageTitle]);

    return <PageComponent {...props} />;
  });
