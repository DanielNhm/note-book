const { Link } = ReactRouterDOM;

export function Home() {
    return (
        <section className="home">
            <h1 className="title">Note and Book</h1>
            <h3 className="subtitle">Google Keep and Book Store</h3>
            <div className="links">
                <Link to="/note" className="link-icon">
                    <img
                        src="assets/img/Google_Keep_icon_(2020).svg.png"
                        alt="Google Keep Icon"
                        className="icon"
                    />
                </Link>
                <Link to="/book" className="link-icon">
                  <img src="assets/img/leather-book-preview-300x252.png" alt="" className="icon" />
                </Link>
            </div>
        </section>
    )
}
