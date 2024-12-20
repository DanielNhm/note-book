
export function ReviewList({ reviews, onDelete }) {

    if(!reviews) return <h2 className="no-info-msg">No reviews yet...</h2>
  return (
    <table className="review-list">
        <thead>
            <tr>
                <td>Full Name</td>
                <td>Rating</td>
                <td>Read At</td>
                <td></td>
            </tr>
        </thead>

        <tbody>
            {reviews.map(review => {
                return <tr key={review.id}>
                    <td>{review.fullName}</td>
                    <td>{review.rating}</td>
                    <td>{review.readAt}</td>
                    <td><button onClick={() => onDelete(review.id)}><i class="fa fa-trash" aria-hidden="true"></i>
                    </button></td>
                </tr>
            })}
        </tbody>
    </table>
  )
}
