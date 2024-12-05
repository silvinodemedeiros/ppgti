from rest_framework import serializers
from layout.models import Widget

# Serializer base para Widget
class WidgetSerializer(serializers.ModelSerializer):
    """
    Serializer principal para manipulação geral dos campos do modelo Widget.
    """

    class Meta:
        model = Widget
        fields = (
            'id', 
            'name',
            'type',
            'value'
        )

# Serializer para criação de Widget utilizando o ID
class WidgetCreate(serializers.ModelSerializer):
    """
    Serializer para criação de Widget utilizando o ID.
    """
    
    class Meta:
        model = Widget
        fields = ('id', 'name', 'type', 'value')

    def create(self, validated_data):
        """
        Método de criação customizado, se necessário.
        """
        wid = Widget.objects.create(**validated_data)
        return wid

# Serializer para atualização de Widget usando o ID
class WidgetUpdate(serializers.ModelSerializer):
    """
    Serializer para atualização de Widget utilizando o ID.
    """
    
    class Meta:
        model = Widget
        fields = ('id', 'name', 'type', 'value')

    def update(self, instance, validated_data):
        """
        Atualiza os dados de um registro existente.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance