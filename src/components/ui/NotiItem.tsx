type ItemProps = {
    item: {
        image: string;
        title: string;
        description: string;
    }
}

const NotiItem = ({item}:ItemProps) => {
  return (
    <div className="flex items-center justify-start gap-2">
        <div className="w-32 rounded-full  overflow-hidden">
            <img src={item.image} alt={item.title} />
        </div>
        <div>
            <h3 className="text-sm font-medium">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.description}</p>
        </div>
    </div>
  )
}

export default NotiItem