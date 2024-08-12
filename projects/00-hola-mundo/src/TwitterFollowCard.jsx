// eslint-disable-next-line react/prop-types
export function TwitterFollowCard ({userName, name, isFollowing})  {
    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    return (
        <article className="tw-followCard">
        <header className="tw-followCard-header">
            <img className="tw-followCard-avatar" alt="Mi imagen" src={`https://unavatar.io/${userName}`}/>
            <div className="tw-followCard-info">
                <strong>{name}</strong>
                <span className="tw-followCard-infoUserName">@{userName}</span>
            </div>
        </header>
        <aside>
            <button className="tw-followCard-button">
                {text}
            </button>
        </aside>
       </article>
    )
}