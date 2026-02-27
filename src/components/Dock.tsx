const DockIconInner = ({
  mouseX,
  item,
}: {
  mouseX: MotionValue;
  item: (typeof DOCK_ITEMS)[0];
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <>
      {item.external || item.href?.endsWith(".pdf") ? (
        <a
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          download={item.href?.endsWith(".pdf") ? true : undefined}
          className="inline-block"
        >
          <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square w-10 rounded-full bg-gray-700/50 border border-white/10 flex items-center justify-center hover:bg-gray-600/80 transition-colors group relative"
          >
            <item.icon className="w-1/2 h-1/2 text-gray-200 group-hover:text-white" />

            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
              {item.label}
            </span>
          </motion.div>
        </a>
      ) : (
        <Link href={item.href} prefetch={false}>
          <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square w-10 rounded-full bg-gray-700/50 border border-white/10 flex items-center justify-center hover:bg-gray-600/80 transition-colors group relative"
          >
            <item.icon className="w-1/2 h-1/2 text-gray-200 group-hover:text-white" />

            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
              {item.label}
            </span>
          </motion.div>
        </Link>
      )}
    </>
  );
};