
export class PaypalPayment {

  constructor (
    public order_id: string,
    public payer_id: string,
    public payment_id: string,
    public payment_token: string,
    public cart: string,
    public create_time: Date,
    public paypal_id: string,
    public intent: string,
    public payer_email: string,
    public country_code: string,
    public payer_first_name: string,
    public payer_middle_name: string,
    public payer_last_name: string,
    public payment_method: string,
    public status: string,
    public state: string,
    public currency: string,
    public total: number
  ) {}

}
