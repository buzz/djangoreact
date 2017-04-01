def to_dict(page, shallow=False):
    d = dict(
        id=page.id,
        title=page.title,
        url_path=page.url,
    )
    menuitems = get_children(page)
    if len(menuitems) > 0 and not shallow:
        d['menuitems'] = menuitems
    return d

def get_children(page):
    menuitems = []
    for child in page.get_children().live().in_menu():
        menuitems.append(to_dict(child))
    return menuitems

def get_nav(request):
    root_page = request.site.root_page
    nav = get_children(root_page)
    if root_page.show_in_menus:
        nav.insert(0, to_dict(root_page, shallow=True))
    return dict(
        menuitems=nav,
    )
