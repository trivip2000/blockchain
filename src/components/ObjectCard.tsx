import { getEclipseAddress } from '@/constants';
import { Card } from 'antd';
interface OwnerWithAddress {
  AddressOwner: string;
}
interface objectChangesProps {
  objectId?: string;
  type?: string;
}
export interface ObjectCardProps {
  object: objectChangesProps;
}
const ObjectCard: React.FC<ObjectCardProps> = ({ object }) => (
  <Card key={('objectId' in object && object.objectId) || ''}>
    <p className="font-medium">Changes</p>
    <p className="font-medium my-3 text-[#008C65]">
      {object.type == 'mutated' ? 'Update' : 'Created'}
    </p>
    <div className="grid grid-cols-2 gap-1">
      <span>Object</span>
      <span className="text-right">
        {getEclipseAddress(('objectId' in object && object.objectId) || '')}
      </span>
      <span>Package</span>
      <span className="text-right">0x2</span>
      <span>Module</span>
      <span className="text-right">coin</span>
      <span>Type</span>
      <span className="text-right">Coin</span>
      <span>Owner</span>
      <span className="text-right">
        {'owner' in object && getEclipseAddress((object.owner as OwnerWithAddress)?.AddressOwner)}
      </span>
    </div>
  </Card>
);
export default ObjectCard;
