from rest_framework import serializers
from layout.models import Grid

# Serializer base para Grid
class GridSerializer(serializers.ModelSerializer):
    """
    Serializer principal para manipulação geral dos campos do modelo Grid.
    """

    class Meta:
        model = Grid
        fields = (
            'id', 
            'name',
            'cells'
        )

# Serializer para criação de Grid utilizando o ID
class GridCreate(serializers.ModelSerializer):
    """
    Serializer para criação de Grid utilizando o ID.
    """
    
    class Meta:
        model = Grid
        fields = ('id', 'name', 'cells')

    def create(self, validated_data):
        """
        Método de criação customizado, se necessário.
        """
        cells_data = validated_data.pop('cells', [])
        gri = Grid.objects.create(**validated_data)
        gri.cells.set(cells_data)
        return gri

# Serializer para atualização de Grid usando o ID
class GridUpdate(serializers.ModelSerializer):
    """
    Serializer para atualização de Grid utilizando o ID.
    """
    
    class Meta:
        model = Grid
        fields = ('id', 'name', 'cells')

    def update(self, instance, validated_data):
        """
        Atualiza os dados de um registro existente, incluindo a associação de células.
        """
        # Atualiza os campos que não são ManyToMany
        for attr, value in validated_data.items():
            if attr != 'cells':  # Ignora o campo 'cells' na atualização direta
                setattr(instance, attr, value)

        # Atualiza o campo ManyToMany (cells)
        cells_data = validated_data.get('cells', [])
        if cells_data:
            instance.cells.set(cells_data)  # Atualiza as células associadas

        instance.save()
        return instance