import {Button, message, Space, Typography} from "antd";
import {GetStaticPaths, GetStaticProps} from "next";
import {useState} from "react";
import {fetchAllBills, fetchOneBill, sendBillAsPDF} from "../../api";
import {withLayout} from "../../layouts/main";
import {Bill} from "../../types/bill";

type BillProps = { bill: Bill };
type QueryParams = { id: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const bills = await fetchAllBills();
  const paths = bills.map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BillProps, QueryParams> = async ({ params }) => {
  const billID = parseInt(params!.id);
  const bill = await fetchOneBill(billID);

  return { props: { bill } };
};

const BillPage = ({ bill }: BillProps) => {
  const [sent, setSent] = useState(false);

  const handleSendPDF = (id: number) => {
    sendBillAsPDF(id);
    message.success("The bill will be sent to the customer");
    setSent(() => true);
  };

  return (
    <main>
      <Typography.Title>Facture #VFNI{`${bill.id}`.padStart(4,"0")}</Typography.Title>
      <Space>
        <Button type="primary" onClick={() => handleSendPDF(bill.id)} disabled={sent}>
          {sent ? "The bill is on its way to your customer" : "Send Bill"}
        </Button>
      </Space>

      <Space>
        <Typography.Text>{bill?.name}</Typography.Text>
        <Typography.Text>{bill?.price} €</Typography.Text>
        <Typography.Text>
          from {bill?.start} to {bill?.end}
        </Typography.Text>
      </Space>
    </main>
  );
};

export default withLayout(BillPage);
