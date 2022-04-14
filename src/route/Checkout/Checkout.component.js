import ContentWrapper from "@scandipwa/scandipwa/src/component/ContentWrapper";
import ProgressBar from "Component/ProgressBar/ProgressBar.component";
import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import "./Checkout.extension.style";
import { BILLING_STEP, DETAILS_STEP, SHIPPING_STEP } from "./Checkout.config";

export default class Checkout extends SourceCheckout {
  renderProgressBar() {
    return (
      <ProgressBar
        steps={["Shipping", "Review & Payments"]}
        currentStep={this.stepMap[this.props.checkoutStep].order}
        height="15vh"
        itemsSize={1.5}
      ></ProgressBar>
    );
  }

  stepMap = {
    [SHIPPING_STEP]: {
      title: __("Shipping step"),
      url: "/shipping",
      render: this.renderShippingStep.bind(this),
      areTotalsVisible: true,
      renderCartCoupon: this.renderCartCoupon.bind(this),
      order: 0,
    },
    [BILLING_STEP]: {
      title: __("Billing step"),
      url: "/billing",
      render: this.renderBillingStep.bind(this),
      areTotalsVisible: true,
      renderCartCoupon: this.renderCartCoupon.bind(this),
      order: 1,
    },
    [DETAILS_STEP]: {
      title: __("Thank you for your purchase!"),
      url: "/success",
      render: this.renderDetailsStep.bind(this),
      areTotalsVisible: false,
      order: 2,
    },
  };

  render() {
    return (
      <main block="Checkout">
        {this.renderProgressBar()}
        <ContentWrapper
          wrapperMix={{ block: "Checkout", elem: "Wrapper" }}
          label={__("Checkout page")}
        >
          {this.renderSummary(true)}
          <div block="Checkout" elem="Step">
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}
