function run(svg: string, namespace: string) {
  svg = svg.replace(/id="(.*?)"/g, (_, p1) => {
    return `id="${namespace}-${p1}"`;
  });

  svg = svg.replace(/xlink:href="#(.*?)"/g, (_, p1) => {
    return `{...{"xlink:href":"#${namespace}-${p1}"}}`;
  });

  return svg;
}
