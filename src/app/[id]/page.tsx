
const page = ({ params }: { params: { id: string } }) => {
  return <div>Booking page of an hospital of id {params.id}</div>;
};

export default page;
