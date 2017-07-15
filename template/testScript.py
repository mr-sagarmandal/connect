import happybase

connection = happybase.Connection('hostName')
connection.open()

print (connection.tables())

table = connection.table('resume')

for key, data in table.scan():
    print (key, data)
