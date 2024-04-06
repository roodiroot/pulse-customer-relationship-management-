import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import BackButton from './back-button';
import Social from './social';

interface CardWrapperProps extends React.HtmlHTMLAttributes<HTMLElement> {
  headerLabel: string;
  backButtonLabek: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabek,
  showSocial,
}) => {
  return (
    <div className="w-full px-4 py-9">
      <Card className="mx-auto sm:w-[400px] shadow-md dark:bg-accent-400 bg-white-project rounded-[36px]">
        <CardHeader className="w-full text-center text-2xl font-semibold">
          {headerLabel}
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton label={backButtonLabek} href={backButtonHref} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardWrapper;
