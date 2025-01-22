from rest_framework import serializers
from layout.models import Cell

# Serializer base para Cell
class CellSerializer(serializers.ModelSerializer):
    """
    Serializer principal para manipulação geral dos campos do modelo Cell.
    """

    class Meta:
        model = Cell
        fields = (
            'id',
            'row_start',
            'row_end',
            'column_start',
            'column_end',
            'widget'
        )

# Serializer para criação de Cell utilizando o ID
class CellCreate(serializers.ModelSerializer):
    """
    Serializer para criação de Cell utilizando o ID.
    """
    
    class Meta:
        model = Cell
        fields = (
            'id',
            'row_start',
            'row_end',
            'column_start',
            'column_end',
            'widget'
        )

    def create(self, validated_data):
        """
        Método de criação customizado, se necessário.
        """
        cel = Cell.objects.create(**validated_data)
        return cel

# Serializer para atualização de Cell usando o ID
class CellUpdate(serializers.ModelSerializer):
    """
    Serializer para atualização de Cell utilizando o ID.
    """
    
    class Meta:
        model = Cell
        fields = (
            'id',
            'row_start',
            'row_end',
            'column_start',
            'column_end',
            'widget'
        )

    def update(self, instance, validated_data):
        """
        Atualiza os dados de um registro existente.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance