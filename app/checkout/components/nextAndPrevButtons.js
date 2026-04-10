import Button from "@/components/button";

export default function NextAndPrevButtons({ childrenNext, childrenPrev, onClickNext, onClickPrev, disabled, extraClass, next, prev }) {

    return (
        <div className="flex justify-between gap-3">
            {prev === true ? (
                <Button
                    type='button'
                    onClick={onClickPrev}
                    disabled={false}
                    typeStyle={'action'}
                    className={'opacity-100 cursor-pointer hover:opacity-90 active:opacity-80'}
                >
                    {childrenPrev}
                </Button>
            ) : ''}
            {next === true ? (
                <Button
                    type='button'
                    onClick={onClickNext}
                    disabled={disabled}
                    typeStyle={'action'}
                    extraClass={extraClass}
                >
                    {childrenNext}
                </Button>
            ) : ''}
        </div>
    )
}
