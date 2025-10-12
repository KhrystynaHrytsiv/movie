import { FC, PropsWithChildren } from "react";
import {Movies} from "../components/movies/Movies";

interface IProps extends PropsWithChildren{}

const MoviePage: FC<IProps> = () => {
    return (
        <div>
          <Movies/>
        </div>
    );
};

export { MoviePage };