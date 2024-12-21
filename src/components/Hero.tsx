interface HeroProps {
    title: string,
    // img: string,
}

export default function Hero(
    {title}: HeroProps
) {
    return (
        <section className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-9xl text-yellow">{title}</h1>
        </section>
    )

}