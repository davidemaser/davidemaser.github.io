pg = {}
pg.render = (input,output,normative,clone,format) ->
  srcItems = input.toString()
  srcRender = output.toString()
  objectBlock = []
  doCodeExport ->
    codeBlock = JSON.stringify(srcItems)
    i = 0
    while i<codeBlock.length
      objectBlock.push()
pg.format = (codeSource,format,repeat) ->
pg.errorLog ( (message,line,column) ->),  callback