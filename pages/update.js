import UpdateProduct from '../components/UpdateProduct'

export default function update({query}) {
    console.log(query);
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  )
}
