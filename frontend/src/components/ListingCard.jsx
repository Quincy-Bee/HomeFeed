<div className="card" key={listing._id}>

<h2>{listing.title}</h2>

<p className="price">
${listing.price.toLocaleString()}
</p>

<p>{listing.address}</p>

<p>{listing.bedrooms} Bed • {listing.bathrooms} Bath</p>

<p>{listing.description}</p>

</div>

function ListingCard({ listing }) {
  return (
    <div className="card">

      <h2>{listing.title}</h2>

      <p className="price">
        ${listing.price.toLocaleString()}
      </p>

      <p>{listing.address}</p>

      <p>
        {listing.bedrooms} Bed • {listing.bathrooms} Bath
      </p>

      <p>{listing.description}</p>

    </div>
  );
}

export default ListingCard;