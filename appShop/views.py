from .models import Product
from django.views import View
from django.shortcuts import render
from django.http import JsonResponse

class PageHome(View):
    def get(self, request):
        return render(request, "home.html")
    
    
GET = {
    'age': 20,
    'balance' : 200
}

class SearchProduct(View):
    def get(self, request):
        query = request.GET.get('q', '')  

        search_products = Product.objects.filter(
            title__iregex=query
        ).values('title', 'price', 'photo')
        
        return JsonResponse({
            'success': True, 
            'query': query, 
            'results': list(search_products),
            'count': len(search_products)
            }, status=200)




