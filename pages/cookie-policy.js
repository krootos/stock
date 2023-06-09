import parse from "html-react-parser";
import Head from "next/head";
import React, { Fragment } from "react";
import Breadcrumb from "../components/common/breadcumb";
import PublicLayout from "../components/public-layout";
import { getServerApiRequest } from "../utils/serverApi";
import MetaHead from "../components/MetaHead";

const CookiePolicy = (props) => {
  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta.meta_title}
        seo_description={props.meta.meta_description}
        seo_keyword={props.meta.meta_keyword}
        seo_image={props.settings.app_logo}
      />
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <Breadcrumb page="Cookie Policy" />
        <section className="terms__area big-img-bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-12">
                <div className="terms__content">
                  {parse(`${props.cookie.description}`)}
                </div>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </Fragment>
  );
};
export default CookiePolicy;
export const getServerSideProps = async ({ req }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const get_cookie_data = await getServerApiRequest(`cookie-policy`, null);
  const metaData = await getServerApiRequest("get-meta", {'meta_type' : 1, 'page' : 5});
  return {
    props: {
      settings: setting_data.data.data,
      footer_info: footer_data.data.data,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      cookie: get_cookie_data.data.data,
      meta: metaData.data.data,
    },
  };
};
