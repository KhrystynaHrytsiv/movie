import { FC, PropsWithChildren } from "react";
import css from './Stars.module.css'

interface IProps extends PropsWithChildren{
    rating: number
}

const Stars: FC<IProps> = ({rating}) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1>= 0.5
    const emptyStars = 10- fullStars-(halfStar? 1: 0);
    return (
        <div className={css.stars}>
            {Array.from({ length: fullStars }, (_, i) => (
                <span key={`full-${i}`} className={`${css.star} ${css.full}`}></span>
            ))}
            {halfStar &&  <span className={`${css.star} ${css.half}`}></span>}
            {Array.from({length: emptyStars},(_, i)=> (
                <span key={`empty-${i}`} className={`${css.star} ${css.empty}`}></span>
            ))}
        </div>
    );
};

export {Stars};