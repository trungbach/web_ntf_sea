import PageTemplate from '@/components/PageTemplate';
import TableOverview from './TableOverview';
export default function() {
  return <PageTemplate content={<TableOverview />} page="overview" />;
}
