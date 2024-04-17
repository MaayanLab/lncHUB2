import json

with open('app/static/lncrna_mapping.json') as f:
    lncrna_mapping = json.load(f)

all_lncRNA_links = list(set(list(lncrna_mapping.keys()) + list(lncrna_mapping.values())))

with open('app/templates/sitemap.xml', 'w') as f:
    f.write("""<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">""")
    for lncRNA in all_lncRNA_links[:(len(all_lncRNA_links)//2)]:
        f.write(f"""<url>
                    <loc>https://maayanlab.cloud/lncHUB2/#{lncRNA}</loc>
                    <lastmod>2023-01-01</lastmod>
                    <changefreq>never</changefreq>
                    </url>""")
        
    f.write("</urlset>")


with open('app/templates/sitemap2.xml', 'w') as f:
    f.write("""<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">""")
    for lncRNA in all_lncRNA_links[(len(all_lncRNA_links)//2):]:
        f.write(f"""<url>
                    <loc>https://maayanlab.cloud/lncHUB2/#{lncRNA}</loc>
                    <lastmod>2023-01-01</lastmod>
                    <changefreq>never</changefreq>
                    </url>""")
        
    f.write("</urlset>")


    
