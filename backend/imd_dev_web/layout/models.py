from django.db import models
from consumer.models import BaseModel

class Widget(BaseModel):
    name = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=100)
    value = models.TextField()

    def __str__(self):
        return f"{self.type}: {self.value}"
    
class Cell(BaseModel):
    row_start = models.IntegerField()
    row_end = models.IntegerField()
    column_start = models.IntegerField()
    column_end = models.IntegerField()
    widget = models.ForeignKey(Widget, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'Cell({self.row_start}, {self.column_start})'
    
class Grid(BaseModel):
    name = models.CharField(max_length=100, blank=True, null=True)
    cells = models.ManyToManyField(Cell)

    def __str__(self):
        return f'Grid {self.id}'
    
class Template(BaseModel):
    name = models.CharField(max_length=100, blank=True, null=True)
    grids = models.ManyToManyField(Grid)

    def __str__(self):
        return f'Template {self.id}'