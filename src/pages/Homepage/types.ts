export interface objectChangesProps {
  objectId: string;
  type: string;
}
export type ObjectCardProps = {
  objectId?: string;
  object?: objectChangesProps; // Add this line
  // include other props as needed
};
export type BalanceChangesProps = {
  amount?: string;
  object?: objectChangesProps; // Add this line
  // include other props as needed
};
export type DataType = {
  coinObjectCount: number;
  coinType: string;
  totalBalance: string;
  // add other properties as needed
};

export type ModalSendTokenProps = {
  setOpen: (open: boolean) => void;
  open: boolean;
  data: DataType[];
};
